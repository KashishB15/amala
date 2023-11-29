import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-facebook";
import { constants } from "src/constants";
import { CustomerService } from "src/customer/customer.service";

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, "facebook") {
    constructor(private readonly customerService: CustomerService) {
        super({
            clientID: constants.FACEBOOK_CLIENT_ID,
            clientSecret: constants.FACEBOOK_SECRET_KEY,
            callbackURL: constants.FACEBOOK_CALLBACK_URL,
            scope: "email",
            profileFields: ["emails", "name"],
        });
    }

    async validate(
        accessToken: string,
        profile: Profile,
        done: (err: any, user: any, info?: any) => void
    ): Promise<any> {
        const { name, emails } = profile;
        const payload = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            accessToken,
        };

        done(null, payload);
    }
}