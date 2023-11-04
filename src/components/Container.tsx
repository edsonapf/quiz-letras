export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col items-center p-12 gap-6">
      {children}
    </main>
  );
}
