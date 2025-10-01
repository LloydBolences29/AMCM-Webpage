
import { motion, AnimatePresence } from "framer-motion";
const BurgerMenu = ({ isOpen, onClose, pageMenus, onMenuClick }) => {
  return (
<AnimatePresence>
      {isOpen && (
        <motion.nav
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="burger-menu"
        >
          <div className="burger-menu-content">
            <button className="close-btn" onClick={onClose}>
              ✕ Close
            </button>

            <ul>
              {pageMenus.map((menu) => (
                <li key={menu.id}>
                  <a
                    href={menu.link}
                    onClick={(e) => {
                      e.preventDefault();
                      onMenuClick(menu);
                      onClose();
                    }}
                  >
                    {menu.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}

export default BurgerMenu
