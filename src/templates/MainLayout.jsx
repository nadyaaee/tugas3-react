function MainLayout({ header, children }) {
  return (
    <div className="app">
      {header}
      <main className="main-content">
        {children}
      </main>
    </div>
  )
}

export default MainLayout
