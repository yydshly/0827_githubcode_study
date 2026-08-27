# 合成测试素材说明

这两张图仅用于 Deep-Live-Cam 本地能力验证。人物均为 2026-08-27 通过 Codex 内置 ImageGen 创建的虚构成年人，不对应真人或公众人物；生成素材和换脸结果未发送到外部服务进行处理。

## 来源人脸

文件：[source-synthetic.png](source-synthetic.png)

```text
Use case: photorealistic-natural
Asset type: synthetic source-face test asset for a local face-swap benchmark
Primary request: a completely fictional adult woman, approximately 30 years old, with a distinct original identity that does not resemble any real person or celebrity
Scene/backdrop: plain neutral light-gray studio background
Subject: head-and-shoulders portrait, face centered and fully visible, hair pulled away from the face, neutral relaxed expression, eyes looking directly at camera
Style/medium: photorealistic unretouched studio photography with natural skin pores and realistic facial texture
Composition/framing: square image, eye-level, symmetrical frontal pose, full forehead, cheeks, jaw and chin visible
Lighting/mood: soft even studio lighting with minimal shadows
Constraints: exactly one adult person; entirely synthetic identity; no glasses; no hat; no hands near face; no text; no logo; no watermark
Avoid: celebrity resemblance, heavy makeup, beauty retouching, dramatic shadows, hair covering the face
```

## 目标图片

文件：[target-synthetic.png](target-synthetic.png)

```text
Use case: photorealistic-natural
Asset type: synthetic target-image test asset for a local face-swap benchmark
Primary request: a completely fictional adult man, approximately 38 years old, with a distinct original identity that does not resemble any real person or celebrity
Scene/backdrop: softly blurred warm neutral indoor studio background
Subject: head-and-shoulders portrait, face fully visible, short hair, subtle natural smile, eyes looking at camera
Style/medium: photorealistic unretouched portrait photography with realistic skin pores, subtle beard stubble and natural texture
Composition/framing: square image, eye-level, head turned about 10 degrees from frontal, full forehead, cheeks, jaw and chin visible
Lighting/mood: soft directional window-like lighting with moderate natural facial shading
Constraints: exactly one adult person; entirely synthetic identity; no glasses; no hat; no hands near face; no text; no logo; no watermark
Avoid: celebrity resemblance, heavy retouching, extreme head angle, dramatic shadows, hair covering the face
```

## 目标运动视频

文件：[target-synthetic-motion.mp4](target-synthetic-motion.mp4)

该视频不是新的真人或生成式视频素材，而是使用本机 FFmpeg 从 `target-synthetic.png` 派生：缩放后做轻微水平移动，输出 640×640、24fps、4 秒、96 帧，并加入静音 AAC 音轨用于验证音轨保留流程。

```powershell
ffmpeg -loop 1 -framerate 24 -i target-synthetic.png `
  -f lavfi -i "anullsrc=channel_layout=stereo:sample_rate=48000" `
  -t 4 `
  -vf "scale=720:720,crop=640:640:x='40+30*sin(n/10)':y=40,format=yuv420p" `
  -c:v libx264 -preset veryfast -crf 18 `
  -c:a aac -b:a 96k -shortest target-synthetic-motion.mp4
```
