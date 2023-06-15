import { Injectable } from '@nestjs/common';
import { ReadlineParser, SerialPort } from 'serialport';
import { SensorData } from '../interfaces/sensor-data.interface';

@Injectable()
export class SerialService {
  private port: SerialPort;
  private parser: ReadlineParser;

  constructor() {
    this.connectToPort();
  }
  private connectToPort() {
    try {
      //for testing mode
      //this.port = new SerialPort({ path: '/dev/pts/1', baudRate: 9600 });

      this.port = new SerialPort({ path: '/dev/ttyUSB0', baudRate: 9600 });
      this.parser = this.port.pipe(new ReadlineParser({ delimiter: '\n' }));
      this.parser.on('data', (data: string) => this.handleData(data));
      this.port.on('error', (error: Error) => this.handleError(error));
      console.log('Connected to port successfully'); // <--- Add this log
    } catch (error) {
      console.error('Failed to connect to port:', error); // <--- Add this log
    }
  }
  private handleData(rawData: string) {
    console.log('Received raw data:', rawData); // <--- Add this log

    try {
      // Convert bytes to string only for testing mode
      //const decodedData = Buffer.from(rawData, 'binary').toString();

      //console.log('Received decoded data:', decodedData); // <--- Modify this log
      const data = this.formatAndValidateData(rawData);
      console.log('Formatted data:', data);
    } catch (error) {
      console.error('Error handling data:', error);
    }
  }

  private handleError(error: Error) {
    console.error('Error on connection to serial port:', error);
    this.reconnect();
  }

  private reconnect() {
    setTimeout(() => {
      try {
        this.connectToPort();
        console.log('Trying to reconnect to the serial port...');
      } catch (error) {
        console.error('Failed to reconnect to the serial port:', error);
        this.reconnect();
      }
    }, 5000);
  }

  private formatAndValidateData(rawData: string): SensorData {
    console.log('Raw data:', rawData);

    let sanitizedData = rawData.trim(); // Remove leading/trailing whitespace
    if (sanitizedData.endsWith(',')) {
      sanitizedData = sanitizedData.slice(0, -1); // Remove trailing comma
    }
    const parsedData: SensorData = JSON.parse(rawData);
    console.log('Parsed data:', parsedData);

    const { timestamp, temperature, humidity } = parsedData;
    console.log('Timestamp:', timestamp);
    console.log('Temperature:', temperature);
    console.log('Humidity:', humidity);

    if (
      Number.isNaN(temperature) ||
      Number.isNaN(humidity) ||
      Number.isNaN(timestamp)
    ) {
      throw new Error('Invalid data from Sensors');
    }

    return parsedData;
  }
}
