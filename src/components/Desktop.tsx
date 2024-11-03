import React from 'react'
import Icon from './Icon'
import Window from './Window'
import { IIcon } from '@utils/interfaces'

interface DesktopProps {
Icons:IIcon[]

}


export default function Desktop( {Icons}: DesktopProps) {
  return (
    <div className='container flex flex-col gap-4 m-4 '>
      {Icons.length > 0 &&
            Icons.map((icon, index) => {
              return (
                <div key={index}>
                  <Icon content={icon} />
                </div>
              );
            })}
            <Window icon={Icons[0]} id={1} />
    </div>
  )
}
