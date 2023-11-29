export declare class TwilioService {
    private readonly twilioClient;
    constructor();
    sendSms(to: string, body: string): Promise<string>;
    verifyOtp(phoneNumber: string, code: string): Promise<string>;
}
