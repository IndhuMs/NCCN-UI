import useRightClickMenu from '../../hooks/useRightClickMenu'
import Menu from './Menu'

export default function TestRightClick() {
    const {x, y, showMenu} = useRightClickMenu();
    return (
        <div>
            <p>Paragraph to test selection</p>
            <Menu x={x} y={y} showMenu={showMenu}/>
        </div>
    )
}