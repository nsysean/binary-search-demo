import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { Button } from "./button";
import "./popUp.css";

export function PopUp({ title, children, toggle, close }) {
  return (
    <div class="bg" style={{backgroundColor: `rgba(0, 0, 0, ${toggle ? 0.7 : 0})`, pointerEvents: toggle ? 'auto' : 'none'}}>
      <div class="modal" style={{pointerEvents: toggle ? 'auto' : 'none', display: toggle ? 'block' : 'none'}}>
        <h2 class="modalHeader">{title}</h2>
        <div class="modalBody">
          {children}
          <div class="modalFooter">
            <Button
              CTA={true}
              onClick={close}
            >
              <span class="btnfix">Close</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
