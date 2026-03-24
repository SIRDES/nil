/* ─── Types ───────────────────────────────────────────────────── */
export interface InstructorType {
    _id: string;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    title?: string;
    bio?: string;
    specializations: string[];
    availabilityStatus: string;
    assignedPrograms: { _id: string; name: string }[] | string[];
    avatarUrl?: string;
}
