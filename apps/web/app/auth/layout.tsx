export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (<div className="flex w-ful h-screen flex-col justify-center items-center">
           
            {children}
        </div>
  );
}
