---
sidebar_position: 2
---

# Chapter 2: Hardware Requirements for Physical AI

## Introduction

This course is technically demanding, sitting at the intersection of three heavy computational loads:
- **Physics Simulation** (Isaac Sim/Gazebo)
- **Visual Perception** (SLAM/Computer Vision)
- **Generative AI** (LLMs/VLA)

Because the capstone involves a simulated humanoid, the primary investment must be in high-performance workstations. However, to fulfill the Physical AI promise, you also need edge computing kits or specific robot hardware.

## The Digital Twin Workstation (Required)

This is the most critical component. NVIDIA Isaac Sim is an Omniverse application that requires RTX (Ray Tracing) capabilities. Standard laptops (MacBooks or non-RTX Windows machines) will not work.

### GPU Requirements (The Bottleneck)
**Minimum**: NVIDIA RTX 4070 Ti (12GB VRAM) or higher

**Why**: You need high VRAM to load the USD (Universal Scene Description) assets for the robot and environment, plus run the VLA (Vision-Language-Action) models simultaneously.

**Ideal**: RTX 3090 or 4090 (24GB VRAM) allows for smoother Sim-to-Real training.

### CPU Requirements
**Recommended**: Intel Core i7 (13th Gen+) or AMD Ryzen 9

**Why**: Physics calculations (Rigid Body Dynamics) in Gazebo/Isaac are CPU-intensive.

### RAM Requirements
**Minimum**: 32 GB DDR5  
**Recommended**: 64 GB DDR5

**Note**: 32 GB is the absolute minimum, but may crash during complex scene rendering.

### Operating System
**Required**: Ubuntu 22.04 LTS

**Note**: While Isaac Sim runs on Windows, ROS 2 (Humble/Iron) is native to Linux. Dual-booting or dedicated Linux machines are mandatory for a friction-free experience.

## The Physical AI Edge Kit

Since a full humanoid robot is expensive, students learn Physical AI by setting up the nervous system before deploying it to a robot. This kit covers Module 3 (Isaac ROS) and Module 4 (VLA).

### The Brain: NVIDIA Jetson
**Model**: NVIDIA Jetson Orin Nano (8GB) or Orin NX (16GB)  
**Price**: Approximately 49 (Orin Nano Super Dev Kit)

**Role**: Industry standard for embodied AI. Students will deploy their ROS 2 nodes here to understand resource constraints versus their powerful workstations.

### The Eyes: Depth Camera
**Model**: Intel RealSense D435i or D455  
**Price**: Approximately 49

**Role**: Provides RGB (Color) and Depth (Distance) data. Essential for VSLAM and Perception modules.

### The Inner Ear: IMU
**Model**: BNO055 or built-in IMU  
**Note**: Often built into the RealSense D435i or Jetson boards, but a separate module helps teach IMU calibration.

### Voice Interface
**Model**: ReSpeaker USB Microphone/Speaker array  
**Price**: Approximately 9

**Role**: Far-field microphone for voice commands (Module 4).

### Complete Economy Jetson Student Kit

| Component | Model | Price (Approx.) |
|-----------|-------|-----------------|
| The Brain | NVIDIA Jetson Orin Nano Super Dev Kit (8GB) | 49 |
| The Eyes | Intel RealSense D435i | 49 |
| The Ears | ReSpeaker USB Mic Array v2.0 | 9 |
| Storage | SD Card (128GB) High-endurance | 0 |
| **TOTAL** | | **~00 per kit** |

## The Robot Lab Options

For the Physical part of the course, you have three tiers of options depending on budget.

### Option A: The Proxy Approach (Recommended for Budget)
Use a quadruped (dog) or robotic arm as a proxy. The software principles (ROS 2, VSLAM, Isaac Sim) transfer 90% effectively to humanoids.

**Robot**: Unitree Go2 Edu  
**Price**: ,800 - ,000

**Pros**: Highly durable, excellent ROS 2 support, affordable enough to have multiple units.  
**Cons**: Not a biped (humanoid).

### Option B: The Miniature Humanoid Approach
Small, table-top humanoids.

**Robot**: Unitree G1  
**Price**: Approximately 6,000

**Budget Alternative**: Hiwonder TonyPi Pro  
**Price**: Approximately 00

**Warning**: Cheap kits (Hiwonder) usually run on Raspberry Pi, which cannot run NVIDIA Isaac ROS efficiently. Use these only for kinematics (walking) and use Jetson kits for AI.

### Option C: The Premium Lab (Sim-to-Real specific)
If the goal is to actually deploy the Capstone to a real humanoid:

**Robot**: Unitree G1 Humanoid  
**Why**: One of the few commercially available humanoids that can actually walk dynamically and has an SDK open enough for students to inject their own ROS 2 controllers.

## Lab Architecture Summary

| Component | Hardware | Function |
|-----------|----------|----------|
| Sim Rig | PC with RTX 4080 + Ubuntu 22.04 | Runs Isaac Sim, Gazebo, Unity, and trains LLM/VLA models |
| Edge Brain | Jetson Orin Nano | Runs the Inference stack. Students deploy their code here |
| Sensors | RealSense Camera + LiDAR | Connected to the Jetson to feed real-world data to the AI |
| Actuator | Unitree Go2 or G1 (Shared) | Receives motor commands from the Jetson |

## Cloud-Native Alternative (High OpEx)

Best for rapid deployment or students with weak laptops.

### Cloud Workstations (AWS/Azure)
**Instance Type**: AWS g5.2xlarge (A10G GPU, 24GB VRAM)  
**Software**: NVIDIA Isaac Sim on Omniverse Cloud

**Cost Calculation**:
- Instance cost: ~.50/hour (spot/on-demand mix)
- Usage: 10 hours/week × 12 weeks = 120 hours
- Storage (EBS volumes): ~5/quarter
- **Total Cloud Bill**: ~05 per quarter

### The Latency Trap (Hidden Cost)
Simulating in the cloud works well, but controlling a real robot from a cloud instance is dangerous due to latency.

**Solution**: Students train in the Cloud, download the model (weights), and flash it to the local Jetson kit.

## Minimum Setup for This Course

If you are just starting and want to follow along:

1. **For Simulation Only** (Chapters 1-3):
   - RTX-capable workstation or cloud instance
   - ROS 2 Humble installed on Ubuntu 22.04
   - Gazebo Garden or NVIDIA Isaac Sim

2. **For Full Physical AI Experience**:
   - Add Jetson Orin Nano Dev Kit
   - Add Intel RealSense D435i
   - Optional: Access to a robot platform

## Key Takeaways

1. Physical AI requires significant computational resources
2. GPU is the primary bottleneck - RTX 4070 Ti minimum
3. Edge computing (Jetson) is essential for deployment learning
4. Cloud alternatives exist but have latency limitations
5. Budget-friendly options like Go2 quadruped provide 90% of learning value
6. The complete economy student kit costs approximately 00

---

Next: [Back to Intro](../intro.md)
