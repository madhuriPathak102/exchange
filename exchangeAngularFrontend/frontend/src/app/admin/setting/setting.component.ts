import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css'],
})
export class SettingComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  generalFormGroup: FormGroup;
  emailFormGroup: FormGroup;
  ticketFormGroup: FormGroup;
  notificationFormGroup: FormGroup;
  securityFormGroup: FormGroup;
  otherFormGroup: FormGroup;
  appLogoUrl: any;
  appFavIconUrl: any;
  tabValue = 0;
  isError = false;
  loading = false;
  errorMessage: any;
  submitted: false;
  firstForm: any;
  index: any;

  ngOnInit(): void {
    this.generalFormGroup = this._formBuilder.group({
      appName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      app_logo: ['', [Validators.required]],
      fav_icon: ['', [Validators.required]],
      appLanguage: ['', [Validators.required]],
      appLanguageSameAsAdmin: [false, [Validators.required]],
      clientSideLanguage: ['', [Validators.required]],
      dateFormat: ['', [Validators.required]],
      time: ['', [Validators.required]],
      mainColor: ['', [Validators.required]],
      headerColor: ['', [Validators.required]],
      enableForceSSL: [false, [Validators.required]],
      enableRTLClientSide: [false, [Validators.required]],
    });
    this.emailFormGroup = this._formBuilder.group({
      fromName: ['', [Validators.required]],
      fromEmail: ['', [Validators.required, Validators.email]],
      replyEmail: ['', [Validators.required, Validators.email]],
      ticketReplyType: ['', [Validators.required]],
      host: ['', [Validators.required]],
      port: ['', [Validators.required]],
      secureProtocol: [false, [Validators.required]],
      secureProtocolType: ['', [Validators.required]],
      emailEnableForceSSL: ['', [Validators.required]],
      emailUserName: ['', [Validators.required]],
      emailPassword: ['', [Validators.required]],
    });
    this.ticketFormGroup = this._formBuilder.group({
      enableGuestTicket: [false, Validators.required],
      showAllPriorityGuestTicket: [false, Validators.required],
      enableHTMLInput: [false, Validators.required],
      enableAutoClose: [false, Validators.required],
      autoClosingRuleHr: ['', Validators.required],
      autoClosingRuleState: ['', Validators.required],
      closingMessage: ['', Validators.required],
      ticketEnableForceSSL: [false, Validators.required],
      addPrefixToTicketTrackID: ['', Validators.required],
      userMaxOpenTicket: [0, Validators.required],
      userCanReOpenTicket: [false, Validators.required],
      reOpenTimeInDay: ['', Validators.required],
      emailReplyStartText: ['', Validators.required],
      enableTicketFeedback: [false, Validators.required],
      feedbackEmailTitle: ['', Validators.required],
      positiveMessage: ['', Validators.required],
      negativeMessage: ['', Validators.required],
    });
    this.notificationFormGroup = this._formBuilder.group({
      onTicketOpen: ['', Validators.required],
      onTicketAssign: ['', Validators.required],
      onTicketUserReply: ['', Validators.required],
      onAdminStaffReply: ['', Validators.required],
      enableToneSound: ['', Validators.required],
      onTicketOpenOnScreen: ['', Validators.required],
      onTicketAssignOnScreen: ['', Validators.required],
      onTicketUserReplyOnScreen: ['', Validators.required],
      onAdminStaffReplyOnScreen: ['', Validators.required],
    });
    this.securityFormGroup = this._formBuilder.group({
      adminPanelSecurity: [false, Validators.required],
      countryBlockSettings: [false, Validators.required],
      temporaryLockAdminOrStaffUserFailedAttempt: ['', Validators.required],
      temporaryLockAdminOrStaffUserFailedAttemptMin: ['', Validators.required],
      countriesListStatus: ['', Validators.required],
      countriesList: ['', Validators.required],
      spamEmails: ['', Validators.required],
      enableForceSSLSecurity: [false, Validators.required],
    });
    this.otherFormGroup = this._formBuilder.group({
      onTicketOpenOtherSetting: [false, Validators.required],
      onTicketAssignOtherSetting: [false, Validators.required],
      googleAnalyticsSettings: [false, Validators.required],
      googleAnalyticsGtagID: ['', Validators.required],
      GDPRSettings: [false, Validators.required],
    });
  }
  isTabDisabled(index: number): boolean {
    return index !== this.tabValue && index !== this.tabValue - 1;
  }
  normalFileUpload(event, identifier): void {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('file', file);
      formData.append('type', identifier);
      if (event.target.id == 'inputFile') {
        this.userService
          .commonImageUpload('admin/common/tmpfileupload', formData)
          .subscribe({
            next: (response) => {
              if (response.status == 200 || response.status == true) {
                if (identifier == 'app_logo') {
                  this.appLogoUrl = response.data;
                } else if (identifier == 'fav_icon') {
                  this.appFavIconUrl = response.data;
                }
                this.toastr.success('Image uploaded successfully !');
              } else {
                this.toastr.error(response.message);
              }
            },
            error: (err) => {
              this.toastr.error(err.error.message);
            },
          });
      }
    }
  }
  finalSave() {
    const firstForm = {
      //general settings
      appName: this.generalFormGroup.value.appName,
      email: this.generalFormGroup.value.email,
      app_logo: this.appLogoUrl,
      fav_icon: this.appFavIconUrl,
      appLanguage: this.generalFormGroup.value.appLanguage,
      appLanguageSameAsAdmin:
        this.generalFormGroup.value.appLanguageSameAsAdmin,
      clientSideLanguage: this.generalFormGroup.value.clientSideLanguage,
      dateFormat: this.generalFormGroup.value.dateFormat,
      time: this.generalFormGroup.value.time,
      mainColor: this.generalFormGroup.value.mainColor,
      headerColor: this.generalFormGroup.value.headerColor,
      enableForceSSL: this.generalFormGroup.value.enableForceSSL,
      enableRTLClientSide: this.generalFormGroup.value.enableRTLClientSide,
      //email settings
      fromName: this.emailFormGroup.value.fromName,
      fromEmail: this.emailFormGroup.value.fromEmail,
      replyEmail: this.emailFormGroup.value.replyEmail,
      ticketReplyType: this.emailFormGroup.value.ticketReplyType,
      host: this.emailFormGroup.value.host,
      port: this.emailFormGroup.value.port,
      secureProtocol: this.emailFormGroup.value.secureProtocol,
      secureProtocolType: this.emailFormGroup.value.secureProtocolType,
      emailEnableForceSSL: this.emailFormGroup.value.emailEnableForceSSL,
      emailUserName: this.emailFormGroup.value.emailUserName,
      emailPassword: this.emailFormGroup.value.emailPassword,
      //ticket settings
      enableGuestTicket: this.ticketFormGroup.value.enableGuestTicket,
      showAllPriorityGuestTicket:
        this.ticketFormGroup.value.showAllPriorityGuestTicket,
      enableHTMLInput: this.ticketFormGroup.value.enableHTMLInput,
      enableAutoClose: this.ticketFormGroup.value.enableAutoClose,
      autoClosingRuleHr: this.ticketFormGroup.value.autoClosingRuleHr,
      autoClosingRuleState: this.ticketFormGroup.value.autoClosingRuleState,
      closingMessage: this.ticketFormGroup.value.closingMessage,
      ticketEnableForceSSL: this.ticketFormGroup.value.ticketEnableForceSSL,
      addPrefixToTicketTrackID:
        this.ticketFormGroup.value.addPrefixToTicketTrackID,
      userMaxOpenTicket: this.ticketFormGroup.value.userMaxOpenTicket,
      userCanReOpenTicket: this.ticketFormGroup.value.userCanReOpenTicket,
      reOpenTimeInDay: this.ticketFormGroup.value.reOpenTimeInDay,
      emailReplyStartText: this.ticketFormGroup.value.emailReplyStartText,
      enableTicketFeedback: this.ticketFormGroup.value.enableTicketFeedback,
      feedbackEmailTitle: this.ticketFormGroup.value.feedbackEmailTitle,
      positiveMessage: this.ticketFormGroup.value.positiveMessage,
      negativeMessage: this.ticketFormGroup.value.negativeMessage,
      //notification settings
      onTicketOpen: this.notificationFormGroup.value.onTicketOpen,
      onTicketAssign: this.notificationFormGroup.value.onTicketAssign,
      onTicketUserReply: this.notificationFormGroup.value.onTicketUserReply,
      onAdminStaffReply: this.notificationFormGroup.value.onAdminStaffReply,
      enableToneSound: this.notificationFormGroup.value.enableToneSound,
      onTicketOpenOnScreen:
        this.notificationFormGroup.value.onTicketOpenOnScreen,
      onTicketAssignOnScreen:
        this.notificationFormGroup.value.onTicketAssignOnScreen,
      onTicketUserReplyOnScreen:
        this.notificationFormGroup.value.onTicketUserReplyOnScreen,
      onAdminStaffReplyOnScreen:
        this.notificationFormGroup.value.onAdminStaffReplyOnScreen,
      //security settings
      adminPanelSecurity: this.securityFormGroup.value.adminPanelSecurity,
      countryBlockSettings: this.securityFormGroup.value.countryBlockSettings,
      temporaryLockAdminOrStaffUserFailedAttempt:
        this.securityFormGroup.value.temporaryLockAdminOrStaffUserFailedAttempt,
      temporaryLockAdminOrStaffUserFailedAttemptMin:
        this.securityFormGroup.value
          .temporaryLockAdminOrStaffUserFailedAttemptMin,
      countriesListStatus: this.securityFormGroup.value.countriesListStatus,
      countriesList: this.securityFormGroup.value.countriesList,
      spamEmails: this.securityFormGroup.value.spamEmails,
      enableForceSSLSecurity:
        this.securityFormGroup.value.enableForceSSLSecurity,
      //other settings
      onTicketOpenOtherSetting:
        this.otherFormGroup.value.onTicketOpenOtherSetting,
      onTicketAssignOtherSetting:
        this.otherFormGroup.value.onTicketAssignOtherSetting,
      googleAnalyticsSettings:
        this.otherFormGroup.value.googleAnalyticsSettings,
      googleAnalyticsGtagID: this.otherFormGroup.value.googleAnalyticsGtagID,
      GDPRSettings: this.otherFormGroup.value.GDPRSettings,
      company_id: 1,
    };
    let data: any = localStorage.getItem('data');
    data = JSON.parse(data);
    console.log(firstForm);
    firstForm.company_id = data.user.company_id;
    this.userService
      .commonPostDataAPI(
        'admin/admin-setting/app-setting/createOrUpdate',
        firstForm
      )
      .subscribe({
        next: (res) => {
          if (res.body.status == true) {
            this.toastr.success(res.body.message);
            this.router.navigate(['/admin/bucreation']);
          } else {
            this.toastr.error(res.body.message);
          }
        },
        error: (err) => {
          this.toastr.error(err.error.message);
        },
      });
  }
}
