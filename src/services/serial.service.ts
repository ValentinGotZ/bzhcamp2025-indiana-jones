import type { SerialPort } from '@/types/serial.type.ts'

export class SerialService {
  private static _serial: SerialPort | null = null

  static async connect() {
    const usbVendorId = 0x10c4

    SerialService._serial = await navigator.serial.requestPort({ filters: [{ usbVendorId }] })
  }

  static get serial() {
    return SerialService._serial
  }

  // get serial() {
  //   if (!this._serial) {
  //     this.connect()
  //   }
  //
  //   return this._serial
  // }
}
