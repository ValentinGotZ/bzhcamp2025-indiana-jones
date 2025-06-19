import type { SerialPort } from '@/types/serial.type.ts'
import { ref, type Ref } from 'vue'

export class SerialService {
  private static _serialService: SerialService | null = null

  public serial: SerialPort | null = null

  private reader: ReadableStreamDefaultReader | null = null
  private writer: WritableStreamDefaultWriter | null = null

  public balanceWeight: Ref<number> = ref(0)

  public static getInstance() {
    if (!SerialService._serialService) {
      SerialService._serialService = new SerialService()
    }

    return SerialService._serialService
  }

  async connect() {
    const usbVendorId = 0x10c4

    this.serial = await navigator.serial.requestPort({ filters: [{ usbVendorId }] })
    await this.serial.open({ baudRate: 115200 })
  }

  async read() {
    if (!this.serial || !this.serial.connected) {
      throw new Error('Serial not connected')
    }

    // if (!this.serial.readable) {
    // }

    if (this.reader) {
      await this._read()
    } else {
      while (this.serial.readable) {
        this.reader = this.serial.readable.getReader()

        await this._read()
      }
    }
  }

  async tare() {
    if (!this.serial || !this.serial.connected) {
      throw new Error('Serial not connected')
    }

    // if (!this.serial.writable) {
    //   await this.serial.open({ baudRate: 115200 })
    // }

    const encoder = new TextEncoder()
    if (!this.writer) {
      this.writer = this.serial.writable.getWriter()
    }
    await this.writer.write(encoder.encode('TARE\n'))
    // writer.releaseLock()
  }

  private async _read() {
    if (!this.reader) {
      return
    }

    try {
      let buffer = ''
      const decoder = new TextDecoder()

      while (true) {
        const { value, done } = await this.reader.read()

        if (done) {
          console.log('_read.DONE')
          break
        }

        const strValue = decoder.decode(value)
        if (strValue.includes('\n')) {
          buffer += strValue.split('\n')[0]

          const weight = Math.abs(parseFloat(buffer.replace('\n', '').replace('\r', '')))
          if (!isNaN(weight)) {
            this.balanceWeight.value = weight
          }

          buffer = strValue.split('\n')[1]
        } else {
          buffer += strValue
        }
      }
    } catch (error) {
      throw error
    } finally {
      // console.log('RELEASE LOCK')
      this.reader.releaseLock()
    }
  }
}
