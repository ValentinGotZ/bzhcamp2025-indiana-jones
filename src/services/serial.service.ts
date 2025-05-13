import type { SerialPort } from '@/types/serial.type.ts'

export class SerialService {
  private static _serialService: SerialService | null = null

  public serial: SerialPort | null = null
  public reader: ReadableStreamDefaultReader | null = null

  public static getInstance() {
    if (!SerialService._serialService) {
      SerialService._serialService = new SerialService()
    }

    return SerialService._serialService
  }

  async connect() {
    const usbVendorId = 0x10c4

    this.serial = await navigator.serial.requestPort({ filters: [{ usbVendorId }] })
  }

  async read(cb: (weight: number) => void) {
    if (!this.serial || !this.serial.connected) {
      throw new Error('Serial not connected')
    }

    if (!this.serial.readable) {
      await this.serial.open({ baudRate: 115200 })
    }

    if (this.reader) {
      await this._read(cb)
    } else {
      while (this.serial.readable) {
        this.reader = this.serial.readable.getReader()

        await this._read(cb)
      }
    }
  }

  private async _read(cb: (weight: number) => void) {
    if (!this.reader) {
      return
    }

    try {
      let buffer = ''
      const decoder = new TextDecoder()

      while (true) {
        const { value, done } = await this.reader.read()

        if (done) {
          break
        }

        const strValue = decoder.decode(value)
        if (strValue.includes('\n')) {
          buffer += strValue.split('\n')[0]

          const weight = Math.abs(parseFloat(buffer.replace('\n', '').replace('\r', '')))
          if (!isNaN(weight)) {
            cb(weight)
          }

          buffer = strValue.split('\n')[1]
        } else {
          buffer += strValue
        }
      }
    } catch (error) {
      throw error
    } finally {
      this.reader.releaseLock()
    }
  }
}

// export class SerialService {
//   private static _serial: SerialPort | null = null
//
//   static async connect() {
//     const usbVendorId = 0x10c4
//
//     SerialService._serial = await navigator.serial.requestPort({ filters: [{ usbVendorId }] })
//   }
//
//   static get serial() {
//     return SerialService._serial
//   }
//
//   static async read(cb: (weight: number) => void) {
//     if (!SerialService._serial || !SerialService._serial.connected) {
//       throw new Error('Serial not connected')
//     }
//
//     if (!SerialService._serial.readable) {
//       await SerialService._serial.open({ baudRate: 115200 })
//     }
//
//     let buffer = ''
//     const decoder = new TextDecoder()
//     while (SerialService._serial.readable) {
//       const reader = SerialService._serial.readable.getReader()
//
//       try {
//         while (true) {
//           const { value, done } = await reader.read()
//
//           if (done) {
//             break
//           }
//
//           const strValue = decoder.decode(value)
//           if (strValue.includes('\n')) {
//             buffer += strValue.split('\n')[0]
//
//             const weight = Math.abs(parseFloat(buffer.replace('\n', '').replace('\r', '')))
//             if (!isNaN(weight)) {
//               cb(weight)
//             }
//
//             buffer = strValue.split('\n')[1]
//           } else {
//             buffer += strValue
//           }
//         }
//       } catch (error) {
//         throw error
//       } finally {
//         reader.releaseLock()
//       }
//     }
//   }
// }
