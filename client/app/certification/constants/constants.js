// actions
//
export const UPDATE_PROGRESS_BAR = 'UPDATE_PROGRESS_BAR';
export const TOGGLE_CANCELLATION_MODAL = 'TOGGLE_CANCELLATION_MODAL';
export const CHANGE_VBMS_HEARING_DOCUMENT = 'CHANGE_VBMS_HEARING_DOCUMENT';
export const CHANGE_TYPE_OF_FORM9 = 'CHANGE_TYPE_OF_FORM9';
export const CHANGE_TYPE_OF_HEARING = 'CHANGE_TYPE_OF_HEARING';

export const CHANGE_REPRESENTATIVE_NAME = 'CHANGE_REPRESENTATIVE_NAME';
export const CHANGE_REPRESENTATIVE_TYPE = 'CHANGE_REPRESENTATIVE_TYPE';
export const CHANGE_OTHER_REPRESENTATIVE_TYPE = 'CHANGE_OTHER_REPRESENTATIVE_TYPE';
export const CHANGE_ORGANIZATION_NAME = 'CHANGE_ORGANIZATION_NAME';
export const CHANGE_POA_MATCHES = 'CHANGE_POA_MATCHES';
export const CHANGE_POA_CORRECT_LOCATION = 'CHANGE_POA_CORRECT_LOCATION';

export const CHANGE_SIGN_AND_CERTIFY_FORM = 'CHANGE_SIGN_AND_CERTIFY_FORM';

export const CERTIFICATION_UPDATE_REQUEST = 'CERTIFICATION_UPDATE_REQUEST';
export const HANDLE_SERVER_ERROR = 'HANDLE_SERVER_ERROR';
export const CERTIFICATION_UPDATE_SUCCESS = 'CERTIFICATION_UPDATE_SUCCESS';
export const CONFIRM_HEARING_UPDATE_SUCCESS = 'CONFIRM_HEARING_UPDATE_SUCCESS';

export const SHOW_VALIDATION_ERRORS = 'SHOW_VALIDATION_ERRORS';

export const RESET_STATE = 'RESET_STATE';

// types of hearings
export const hearingPreferences = {
  VIDEO: 'VIDEO',
  TRAVEL_BOARD: 'TRAVEL_BOARD',
  WASHINGTON_DC: 'WASHINGTON_DC',
  HEARING_TYPE_NOT_SPECIFIED: 'HEARING_TYPE_NOT_SPECIFIED',
  NO_HEARING_DESIRED: 'NO_HEARING_DESIRED',
  HEARING_CANCELLED: 'HEARING_CANCELLED',
  NO_BOX_SELECTED: 'NO_BOX_SELECTED'
};

// form9 values
export const form9Types = {
  FORMAL_FORM9: 'FORMAL_FORM9',
  INFORMAL_FORM9: 'INFORMAL_FORM9'
};

// representation for the appellant
// TODO: We need to map these more closely with the rep types we pull in from BGS and VACOLS.
export const representativeTypes = {
  ATTORNEY: 'ATTORNEY',
  AGENT: 'AGENT',
  ORGANIZATION: 'ORGANIZATION',
  NONE: 'NONE',
  // TODO: should "Other be a real type"?
  OTHER: 'OTHER'
};

// was a hearing document found in VBMS?
export const vbmsHearingDocument = {
  FOUND: 'FOUND',
  NOT_FOUND: 'NOT_FOUND'
};

export const progressBarSections = {
  CHECK_DOCUMENTS: 'CHECK_DOCUMENTS',
  CONFIRM_CASE_DETAILS: 'CONFIRM_CASE_DETAILS',
  CONFIRM_HEARING: 'CONFIRM_HEARING',
  SIGN_AND_CERTIFY: 'SIGN_AND_CERTIFY'
};

export const certifyingOfficialTitles = {
  DECISION_REVIEW_OFFICER: 'DECISION_REVIEW_OFFICER',
  RATING_SPECIALIST: 'RATING_SPECIALIST',
  VETERANS_SERVICE_REPRESENTATIVE: 'VETERANS_SERVICE_REPRESENTATIVE',
  CLAIMS_ASSISTANT: 'CLAIMS_ASSISTANT',
  OTHER: 'OTHER'
};

// does the POA information match?
export const poaMatches = {
  MATCH: 'MATCH',
  NO_MATCH: 'NO_MATCH'
};

export const poaCorrectLocation = {
  VBMS: 'VBMS',
  VACOLS: 'VACOLS',
  NONE: 'NONE'
};

export const organizationNames = {
  THE_AMERICAN_LEGION: 'American Legion',
  AMVETS: 'AmVets',
  AMERICAN_RED_CROSS: 'ARC',
  DISABLED_AMERICAN_VETERANS: 'DAV',
  JEWISH_WAR_VETERANS: 'JWV',
  MILITARY_ORDER_OF_THE_PURPLE_HEART: 'MOPH',
  PARALYZED_VETERANS_OF_AMERICA: 'PVA',
  VETERANS_OF_FOREIGN_WARS: 'VFW',
  STATE_SERVICE_ORGANIZATIONS: 'State Svc Org',
  MARYLAND_VETERANS_COMMISSION: 'Md Veterans Comm',
  VIRGINIA_DEPARTMENT_OF_VETERANS_AFFAIRS: 'Virginia Dept of Veteran',
  NAVY_MUTUAL_AID_ASSOCIATION: 'Navy Mut Aid',
  NON_COMMISSIONED_OFFICERS_ASSOCIATION: 'NCOA',
  OTHER_SERVICE_ORGANIZATION: 'Other',
  ARMY_AND_AIR_FORCE_MUTUAL_AID_ASSN: 'Army Mut Aid',
  CATHOLIC_WAR_VETERANS: 'Catholic War Vets',
  FLEET_RESERVE_ASSOCIATION: 'Fleet Reserve',
  MARINE_CORP_LEAGUE: 'Marine Corps League',
  VIETNAM_VETERANS_OF_AMERICA: 'VVA',
  AMERICAN_EX_PRISONERS_OF_WAR: 'EXPOW',
  BLINDED_VETERANS_ASSOCIATION: 'Blinded Vet Assoc',
  NATIONAL_VETERANS_LEGAL_SERVICES_PROGRAM: 'NVLSP',
  NATIONAL_VETERANS_ORGANIZATION_OF_AMERICA: 'NVOA',
  WOUNDED_WARRIOR_PROJECT: 'WWP',
  UNLISTED_SERVICE_ORGANIZATION: 'UNLISTED_SERVICE_ORGANIZATION'
};
