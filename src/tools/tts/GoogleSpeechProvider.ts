import { SPEECH_GOOGLE_API_URL_WITH_KEY } from './../../config';
import { ISpeechProvider } from './ISpeechProvider';

/**
 * This class provides access to Google cloud TTS service
 */
export class GoogleSpeechProvider implements ISpeechProvider {
    async getAudio(ssml: string, $external = false): Promise<string> {
        try {
            const data = {
                input: { ssml },

                voice: {
                    // todo to config //choose from https://cloud.google.com/text-to-speech/docs/voices
                    languageCode: 'en-GB-Standard-D',
                },
                audioConfig: { audioEncoding: 'MP3', speaking_rate: 1 },
            };

            const response = await fetch(SPEECH_GOOGLE_API_URL_WITH_KEY);
            const body = await response.json();

            const audioContent = body.audioContent;

            return audioContent;
        } catch (error) {
            console.error(error);
            throw new Error(
                `Cannot convert ssml into mp3 via GoogleSpeechProvider.`,
            );
        }

        /*
		$data = [
			'input' => ['ssml' => $ssml],
			'voice' => [
				// todo to config //choose from https://cloud.google.com/text-to-speech/docs/voices
				'languageCode' => 'en-GB-Standard-D',
			],
			'audioConfig' => ['audioEncoding' => 'MP3', 'speaking_rate' => 1],
		];

		if (!file_exists($cacheFile = FileHelper::getCacheFile('mp3', strip_tags($ssml), $data)))
		{
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
			curl_setopt($ch, CURLOPT_URL, $this->url);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
			curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/525.13 (KHTML, like Gecko) Chrome/0.A.B.C Safari/525.13");
			curl_setopt($ch, CURLOPT_POST, true);
			$payload = json_encode($data);

			curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
			curl_setopt($ch, CURLOPT_HTTPHEADER, [
				"Content-type: application/json",
				'Content-Length: ' . strlen($payload)
			]);

			$result = curl_exec($ch);
			curl_close($ch);

			$result = json_decode($result, true);
			$content = base64_decode($result['audioContent']);

			if ($content)
			{
				file_put_contents($cacheFile, $content);
				chmod($cacheFile, 0777);
			}
			else
			{
				throw new \Exception("Can not create audio from:\n\n $ssml");
			}
		}

		if (!$external)
			return $cacheFile;
		else
			return FileHelper::getCacheFile('mp3', strip_tags($ssml), $data, true);

			\
		*/
    }
}
