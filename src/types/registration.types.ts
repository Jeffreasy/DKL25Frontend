/** Represents the complete form data structure for registration */
export interface FormData {
  /** Personal information of the registrant */
  personalInfo: PersonalInfo;
  /** Role and participation details */
  roleInfo: RoleInfo;
  /** Medical and health information */
  medicalInfo: MedicalInfo;
  /** Emergency contact information */
  emergencyContact: EmergencyContact;
  /** Terms and conditions acceptance */
  terms: Terms;
}

/** Personal information fields */
export interface PersonalInfo {
  /** First name of the registrant */
  firstName: string;
  /** Last name of the registrant */
  lastName: string;
  /** Email address for communication */
  email: string;
  /** Phone number for contact */
  phone: string;
  /** Date of birth in ISO format */
  birthDate: string;
}

/** Role and participation information */
export interface RoleInfo {
  /** Role of the participant */
  role: Role;
  /** Distance in kilometers (only for runners) */
  distance?: number;
  /** T-shirt size (optional) */
  shirtSize?: string;
  /** Type of support (only for supporters) */
  supportType?: 'donation' | 'volunteer';
}

/** Medical and health information */
export interface MedicalInfo {
  /** Any medical conditions to be aware of */
  conditions: string;
  /** Dietary requirements or preferences */
  dietary: string;
  /** Known allergies */
  allergies: string;
}

/** Emergency contact details */
export interface EmergencyContact {
  /** Name of emergency contact */
  name: string;
  /** Phone number of emergency contact */
  phone: string;
  /** Relationship to participant */
  relation: string;
}

/** Terms and conditions acceptance */
export interface Terms {
  /** General terms and conditions accepted */
  acceptedTerms: boolean;
  /** Privacy policy accepted */
  acceptedPrivacyPolicy: boolean;
  /** Date when terms were accepted */
  acceptedDate: string;
}

/** Available roles for participants */
export type Role = 'runner' | 'volunteer' | 'supporter';

/** Status of a registration */
export type RegistrationStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';

// Component props
export interface SectionProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onNext?: () => void;
  onPrev?: () => void;
} 

// Response types
export interface RegistrationFormData {
  formData: FormData;
}

export interface RegistrationResponse {
  id: string;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  formData: FormData;
  createdAt: string;
  updatedAt: string;
}

export interface RegistrationStatusResponse {
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  updatedAt: string;
} 