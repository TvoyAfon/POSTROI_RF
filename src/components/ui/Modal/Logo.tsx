import { CSSProperties } from 'react'

interface ILogo {
  styles?: CSSProperties
}

const Logo: React.FC<ILogo> = ({ styles = {} }) => {
  return (
    <span
      style={{
        fontSize: '20px', fontWeight: '700', display: 'flex', justifyContent: 'center', ...styles
      }}
      className='logo'
    >
      ПОСТРОЙ
      <span style={{ color: "#7099ED" }}>.РФ</span>
    </span>
  )
}

export default Logo
