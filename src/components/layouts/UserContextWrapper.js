import AuthProvider from "@/components/providers/AuthProvider";
import HeaderLayout from "@/components/layouts/HeaderLayout";

export default function UserContextWrapper({ children }) {
    return (
        <AuthProvider>
            <HeaderLayout>
                {children}
            </HeaderLayout>
        </AuthProvider>
    );
}