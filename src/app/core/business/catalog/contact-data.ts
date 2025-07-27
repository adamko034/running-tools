export class ContactData {
  static readonly EMAIL = 'elioapps@outlook.com';
  static readonly RESPONSE_TIME_DAYS = 7;
  static readonly SUPPORTED_LANGUAGES = ['English', 'Polish'] as const;
  
  static readonly INQUIRY_TYPES = [
    'bugs_and_issues',
    'rodo_gdpr',
    'general_questions'
  ] as const;
}