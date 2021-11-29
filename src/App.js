// code example https://codesandbox.io/s/react-three-fiber-orbit-controls-without-drei-7c11y?file=/src/App.js:962-1023
// code gen https://gltf.pmnd.rs
// environment options https://github.com/pmndrs/drei/blob/master/src/helpers/environment-assets.ts
// cool ascii render example 😁 https://threejs.org/examples/#webgl_effects_ascii
// three.js docs https://threejs.org/docs
// fiber + drei docs https://docs.pmnd.rs

import React, { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment, Text, PositionalAudio, PerspectiveCamera } from '@react-three/drei'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'

function ButtonModel({ spin }) {
  const { nodes, materials } = useGLTF('/button.glb')
  return (
    <>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle.geometry}
        material={materials['Material.002']}
        scale={.35}
        position={[0, 2.55, -.1]}
        rotation={[Math.PI /2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder.geometry}
        material={materials['Material.003']}
        scale={.4}
        position={[0, 2.55, 0]}
        rotation={[Math.PI /2, 0, 0]}
        onClick={spin}
      />
    </>
  )
}

function TableModel() {
  const { nodes, materials } = useGLTF('/table.glb')
  return (
    <group onClick={e => e.stopPropagation()} scale={.1} dispose={null} rotation={[0, -Math.PI / 2, 0]} position={[6.1,-10.16,1.3]}>
      <mesh
        geometry={nodes.Crossbars_low_Mat_Table_0.geometry}
        material={nodes.Crossbars_low_Mat_Table_0.material}
      />
      <mesh
        geometry={nodes.Frame_low_Mat_Table_0.geometry}
        material={nodes.Frame_low_Mat_Table_0.material}
      />
      <mesh
        geometry={nodes.Legs_low_Mat_Table_0.geometry}
        material={nodes.Legs_low_Mat_Table_0.material}
      />
      <mesh
        geometry={nodes.Support_low_Mat_Table_0.geometry}
        material={nodes.Support_low_Mat_Table_0.material}
      />
      <mesh
        geometry={nodes.Surface_low_Mat_Table_0.geometry}
        material={nodes.Surface_low_Mat_Table_0.material}
      />
      <mesh
        geometry={nodes.Tarp_low_Mat_Tarp_0.geometry}
        material={materials['Mat_Tarp.002']}
      />
    </group>
  )
}

function SpinnerModel({ red, green, yellow, blue, setActiveColor, activeColor, speed }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/spinner.glb')
  
  useFrame(() => {
    if (speed > 0) {
      group.current.rotation.z = group.current.rotation.z += speed
    }
  })

  return (
    <group ref={group} dispose={null}>
      <group position={[0, 0, 0]} rotation={[-Math.PI, 0, -Math.PI]} scale={1}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Spin_Wheel.geometry}
          material={materials.Atlas_1}
        />
      </group>
      <group>
        <mesh
          geometry={nodes.Green.geometry}
          material={nodes.Green.material}
          rotation={[1.54, -0.29, 0.1]}
          scale={1.6}
          position={[-.1,.1,.35]}
          onClick={(e) => setActiveColor('green')}
        />
        <Text 
          color='black'
          scale={3}
          position={[-.5,1,.2]}
          rotation={[0, 0, .4]}
          outlineColor='white'
          outlineWidth={activeColor === 'green' ? .005 : 0}
        >
          {green}
        </Text>
      </group>
      <group>
        <mesh
          geometry={nodes.Red.geometry}
          material={nodes.Red.material}
          rotation={[-1.92, -1.26, 2.83]}
          scale={1.6}
          position={[.1,.1,.35]}
          onClick={(e) => setActiveColor('red')}
        />
        <Text 
          color='black'
          scale={3}
          position={[1,.5,.2]}
          rotation={[0, 0, -1.2]}
          outlineColor='white'
          outlineWidth={activeColor === 'red' ? .005 : 0}
        >
          {red}
        </Text>
      </group>
      <group>
        <mesh
          geometry={nodes.Blue.geometry}
          material={nodes.Blue.material}
          rotation={[-1.6, 0.29, 3.04]}
          scale={1.6}
          position={[.1,-.1,.35]}
          onClick={(e) => setActiveColor('blue')}
        />
        <Text 
          color='black'
          scale={3}
          position={[.5,-1,.2]}
          rotation={[0, 0, -2.7]}
          outlineColor='white'
          outlineWidth={activeColor === 'blue' ? .005 : 0}
        >
          {blue}
        </Text>
      </group>
      <group>
      <mesh
        geometry={nodes.Yellow.geometry}
        material={nodes.Yellow.material}
        rotation={[1.22, 1.26, 0.31]}
        scale={1.6}
        position={[-.1,-.1,.35]}
        onClick={(e) => setActiveColor('yellow')}
      />
        <Text 
          color='black'
          scale={3}
          position={[-1,-.5,.2]}
          rotation={[0, 0, 2]}
          outlineColor='white'
          outlineWidth={activeColor === 'yellow' ? .005 : 0}
        >
          {yellow}
        </Text>
      </group>
    </group>
  )
}

function StandModel() {
  const { nodes } = useGLTF('/stand.glb')
  return (
    // TODO: should have stand stop click propagation
    // but the stand model has buggy behavior like blocking button clicks unexpectedly
    <group position={[0, 0, 0]} rotation={[-Math.PI, 0, -Math.PI]} scale={1}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Spin_Wheel_Needle.geometry}
        material={nodes.Spin_Wheel_Needle.material}
        position={[0, 2.03, 0.15]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Spin_Wheel_Stand.geometry}
        material={nodes.Spin_Wheel_Stand.material}
        position={[0, -2.73, 0.23]}
      />
    </group>
  )
}

export default function App() {
  const [greenText, setGreenText] = useState('Green')
  const [redText, setRedText] = useState('Red')
  const [yellowText, setYellowText] = useState('Yellow')
  const [blueText, setBlueText] = useState('Blue')
  const [speed, setSpeed] = useState(0)
  const [activeColor, setActiveColor] = useState()
  const [playClick, setPlayClick] = useState()
  const redIn = useRef(null)
  const greenIn = useRef(null)
  const yellowIn = useRef(null)
  const blueIn = useRef(null)
  const emptyIn = useRef(null)

  useEffect(() => {
    if (blueIn.current && greenIn.current && redIn.current && yellowIn.current) {
      if (activeColor === 'blue') blueIn.current.focus()
      if (activeColor === 'green') greenIn.current.focus()
      if (activeColor === 'red') redIn.current.focus()
      if (activeColor === 'yellow') yellowIn.current.focus()
    }
  }, [activeColor])

  function enter(e) {
    if (e.keyCode === 13) { // Enter key
      setActiveColor(null)
      emptyIn.current.focus()
    }
  }

  function spin() {
    setPlayClick(true)
    setTimeout(() => setPlayClick(false), 500)
    setSpeed(.05)
    // Interval runs every .2s
    let interval = setInterval(() => {
      setSpeed(prev => {
        if ((prev - .0005) > .02) {
          return prev - .0005
        } else if ((prev - .00025) > 0) {
          return prev - .00025
        } else {
          setSpeed(0)
        }
      })
    }, 200)
    // Runs after 30s and clears interval
    setTimeout(() => clearInterval(interval), 30000)
  }

  // GUI
  // TODO: buggy after pressing spin button
  const panel = new GUI( { width: 310, title: 'Links & Credits' } )
  panel.add({'Github': () => window.location.href = 'https://github.com/codabool'}, 'Github')
  panel.add({'Other Projects': () => window.location.href = 'https://codabool.com/projects'}, 'Other Projects')
  const folder = panel.addFolder( 'Credits' )
  folder.add({'Table Model': () => window.location.href = 'https://sketchfab.com/3d-models/foldable-table-fa805b31129b4034b2b8433073873367'}, 'Table Model')
  folder.add({'Spinner & Stand Model': () => window.location.href = 'https://sketchfab.com/3d-models/wheel-of-fortune-3164c3ea0e3f4ae0bc2e843f101cc207'}, 'Spinner & Stand Model')
  folder.add({'Background': () => window.location.href = 'https://polyhaven.com/a/mutianyu'}, 'Background')
  if (typeof document !== 'undefined') {
    const guiStatsEl1 = document.createElement( 'p' )
    guiStatsEl1.innerHTML = `Table: Oliver Triplett`
    folder.$children.appendChild( guiStatsEl1 )
    const guiStatsEl2 = document.createElement( 'p' )
    guiStatsEl2.innerHTML = `Spinner: nyu_grad_alley_2020`
    folder.$children.appendChild( guiStatsEl2 )
    const guiStatsEl3 = document.createElement( 'p' )
    guiStatsEl3.innerHTML = `Background: Greg Zaal`
    folder.$children.appendChild( guiStatsEl3 )
  }
  folder.close()
  panel.close()

  return (
    <>
      <Canvas>
        <OrbitControls />
        <Suspense fallback={null}>
          <PerspectiveCamera />
          <ButtonModel spin={spin} />
          <SpinnerModel red={redText} green={greenText} yellow={yellowText} blue={blueText} setActiveColor={setActiveColor} activeColor={activeColor} speed={speed} />
          <StandModel />
          <TableModel />
          <Environment files="background.hdr" background />
          {speed > 0 &&
            <PositionalAudio
              url="/spin.wav"
              autoplay={true}
              loop
            />
          }
          {playClick > 0 &&
            <PositionalAudio
              url="/click.wav"
              autoplay={true}
            />
          }
        </Suspense>
        <pointLight position={[0, 10, 0]} intensity={1} />
        <ambientLight intensity={.1} />
        {/* <Stats showPanel={0} /> */}
      </Canvas>
      <input value={redText} onKeyDown={enter} onChange={(e) => setRedText(e.target.value)} ref={redIn} />
      <input value={greenText} onKeyDown={enter} onChange={(e) => setGreenText(e.target.value)} ref={greenIn} />
      <input value={yellowText} onKeyDown={enter} onChange={(e) => setYellowText(e.target.value)} ref={yellowIn} />
      <input value={blueText} onKeyDown={enter} onChange={(e) => setBlueText(e.target.value)} ref={blueIn} />
      <input ref={emptyIn} />
    </>
  )
}