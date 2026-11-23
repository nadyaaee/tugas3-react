function MainLayout({ header, children }) {
  return (
    <div className="min-h-screen bg-slate-50">
      {header}

      <main className="w-full">
        {children}
      </main>
    </div>
  )
}

export default MainLayout
