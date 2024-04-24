class PatientService {
  static instance: PatientService | null = null;

  getMeetingURL(id_patient: string): string {
    return "https://www.youtube.com/watch?v=SD_FQzN0n3A";
  }
  
  static getInstance(): PatientService {
    if (PatientService.instance) {
      return PatientService.instance;
    } else {
      PatientService.instance = new PatientService();
      return PatientService.instance;
    }
  }
}

export default PatientService;
