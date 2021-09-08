export default class User {
    constructor(email, number, name, gender, language, avatarUrl) {
        this.email = email;
        this.number = number;
        this.name = name;
        this.gender = gender;
        this.language = language;
        this.avatarUrl = avatarUrl;
    }

    getData() {
        return {
            email: this.email,
            number: this.number,
            name: this.name,
            gender: this.gender,
            language: this.language,
            avatarUrl: this.avatarUrl
        };
    }
};
