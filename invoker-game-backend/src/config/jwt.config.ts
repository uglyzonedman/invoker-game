import { JwtModuleOptions } from '@nestjs/jwt';

export const getJWTConfig = async (): Promise<JwtModuleOptions> => ({
  secret: 'misha-krasava-oscar-chyrka',
});
