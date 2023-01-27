import { Injectable } from '@nestjs/common';

import { Configuration, getConfigFromEnv } from '../dtos';

@Injectable()
export class ConfigurationService {
  private config: Configuration;

  /**
   * Constructor
   */
  constructor() {
    this.config = getConfigFromEnv();
  }

  /**
   * Get configuration dto
   * @returns Configuration
   */
  public getConfiguration(): Configuration {
    return { ...this.config };
  }
}