export function SidebarLoggedOutFooter({ onOpenLogin }) {
  return (
    <div className="sidebar__footer">
      <button className="sidebar__login" onClick={onOpenLogin}>
        <span>Log in</span>
        <span aria-hidden="true">→</span>
      </button>
      <button className="sidebar__desktop">Get Desktop</button>
    </div>
  )
}
