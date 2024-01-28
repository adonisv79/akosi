export default function AuthLoginLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section
      id="auth-layout"
      className="min-h-screen flex items-center justify-center bg-slate-500"
    >
      {children}
    </section>
  );
}
