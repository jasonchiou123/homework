import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, Cloud, OrbitControls } from '@react-three/drei'

/* 產生立方體 */
function Box(props) {  /* 取得 position={[-5, 0, 0]} */
  const ref = useRef()  // 用來指向某個標記物件
  const [hovered, hover] = useState(false)  // 滑鼠游標移入移出
  const [clicked, click] = useState(false)  // 按下滑鼠左鍵
  //react系統會定期重繪畫面來反映狀態變化，useFrame會在每次重繪畫面時執行
  useFrame(() => (ref.current.rotation.x += 0.05))  // 繞著x橫軸旋轉

  return (
    <mesh
      {...props}  /* 設定 position={[-5, 0, 0]} */
      ref={ref}
      scale={clicked ? 1.5 : 1}  /* 按下滑鼠左鍵時放大 */
      onClick={() => click(!clicked)}  /* 按下滑鼠左鍵? 第二次按下時回復 */
      onPointerOver={() => hover(true)}  /* 滑鼠游標移入時 */
      onPointerOut={() => hover(false)}  /* 滑鼠游標移出時 */
      >
      <boxGeometry args={[2, 2, 2]} />  {/* 產生邊長 2x2x2 的立方體 */}
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />  {/* 設定外皮貼圖顏色 */}
    </mesh>
  )
}

export default function Three() {
  return (
    <center>
    <div style={{ width: '1024px', height: '768px' }}>
    <Canvas>  {/* 3D畫布,尺寸以包含的div為準 */}
      <ambientLight />  {/* 環境光 */}
      <OrbitControls />  
      {/*  3D視點控制器:
      按住滑鼠左鍵上下左右拖動: 旋轉視點，
      按住滑鼠右鍵: 平移視點 
      滑鼠中鍵滾輪: 視點放大縮小  */}
      <Text
        position={[0, 0, -5]} fontSize={2} color="black" anchorX="center" anchorY="middle"
      >
        Hello 您好!
      </Text>
      {/* 3D座標系統: x,y,z
        X是畫面左右橫軸, 
        Y是畫面上下縱軸,
        Z軸是畫面遠近距離  */}
      <Box position={[-5, 0, 0]} />  {/* 產生立方體 */}
      <Cloud position={[0, 0, -10]} speed={2} />  {/* 粒子系統:產生雲朵,飄動速度為2 */}
    </Canvas>
    </div>
    </center>
  )
}

