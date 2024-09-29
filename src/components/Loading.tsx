import Logo from '@assets/RONALDOS_LOGO.png'

export default function Loading() {
  return (
    <div className=''>
      <img src={Logo} alt="RONALDOS LOGO" className='w-96 animate-pulse' />
    </div>
  )
}
