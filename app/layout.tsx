import "./globals.css";

export const metadata = {
  title: "Goal-Based Savings Planner",
  description: "Track multiple savings goals with live currency conversion",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
