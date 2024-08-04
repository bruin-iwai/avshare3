import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';

export const getSectets = async (secretId: string) => {
  const client = new SecretsManagerClient();
  const cmd = new GetSecretValueCommand({
    SecretId: secretId,
  });
  const { SecretString } = await client.send(cmd);
  return SecretString;
};
