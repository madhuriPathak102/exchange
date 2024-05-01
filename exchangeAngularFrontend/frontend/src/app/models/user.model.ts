export class userModel {
  constructor(
    public email: string,
    public name: string,
    public mobile_number: string,
    public company_name: string,
    public domain_name: string,
    public company_logo: string,
    public color_theme: colorTheme,
    public account_details: accountDetails,
    public required_fields: []=[]) {

  }

}
export class accountDetails {
  constructor(
    public pan_card_number: string,
    public pan_card_image: string,
    public gst_number: string,
    public gst_image: string,
    public adhar_card_number: string,
    public adhar_card_image: string,
    public bank_account_number: string,
    public bank_ifsc_code: string,
    public bank_account_image: string) { }

}

export class colorTheme {
  constructor(
    public header_bg_color: string,
    public header_txt_color: string,
    public sidebar_bg_color: string,
    public sidebar_txt_color: string,
    public primary_button_bg_color: string,
    public primary_button_txt_color: string,
    public footer_bg_color: string,
    public footer_txt_color: string) { }


}

export class domainName {
  constructor(
    public domain_name: string,
  ) { }


}

export class userList {
  constructor(
   public _id: string,
   public name: string,
   public mobile_number: string,
   public company_name: string,
   public status: string,
   public email: string,
   public domain: domainName[]) { }


}


