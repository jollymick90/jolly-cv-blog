export interface RoleProps {
    company: string;
    title: string;
    logo: string;
    start: string | { label: string; dateTime: string };
    end: string | { label: string; dateTime: string };
}