import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  colorFrom?: string;
  colorTo?: string;
  children?: React.ReactNode;
  isHovered?: boolean; // Force hover state regardless of mouse position
  bottomOnly?: boolean; // Show animation only on bottom edge, left to right
  animationDelay?: number; // Delay before animation starts (in seconds)
  animationIterations?: number | 'infinite'; // Number of animation iterations (1 for single pass, 'infinite' for continuous)
}

const BorderBeam: React.FC<BorderBeamProps> = ({
  className,
  size = 48, // 3rem = 48px
  duration = 2,
  colorFrom = '#8b82f6',
  colorTo = '#8b5cf6',
  children,
  isHovered: forceHovered = false,
  bottomOnly = false,
  animationDelay = 0,
  animationIterations = 'infinite',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  // Effective hover state: use prop if set, otherwise use actual hover state
  const effectiveHovered = forceHovered || isHovered;
  // If bottomOnly is true, always use bottom side (2), otherwise start with top (0)
  const [currentSide, setCurrentSide] = useState(bottomOnly ? 2 : 0); // 0: top, 1: right, 2: bottom, 3: left

  // Initialize visibility when forceHovered is set or bottomOnly is true
  useEffect(() => {
    if (forceHovered || bottomOnly) {
      setIsVisible(true);
    }
  }, [forceHovered, bottomOnly]);
  const [shapes, setShapes] = useState<Array<{ id: number, x: number, y: number, color: string, shape: string, direction: string }>>([]);
  const [lightPosition, setLightPosition] = useState(0); // 0-100% around the border
  const containerRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);
  const shapeIdRef = useRef(0);

  // Rainbow colors
  const rainbowColors = ['#ff0000', '#ff8000', '#ffff00', '#80ff00', '#00ff00', '#00ff80', '#00ffff', '#0080ff', '#0000ff', '#8000ff', '#ff00ff', '#ff0080'];
  const shapesList = ['circle', 'square', 'triangle', 'diamond'];

  useEffect(() => {
    const startAnimation = () => {
      const timer = setTimeout(() => {
        if (!effectiveHovered) {
          setIsVisible(true);
        }
      }, Math.floor(Math.random() * 50));
      return timer;
    };

    const timer = startAnimation();
    return () => clearTimeout(timer);
  }, [effectiveHovered, currentSide]);

  const handleAnimationEnd = () => {
    setIsVisible(false);
    if (!effectiveHovered && !bottomOnly) {
      // Move to next side (only if not bottomOnly)
      setCurrentSide((prev) => (prev + 1) % 4);

      // Restart animation with constant delay
      setTimeout(() => {
        if (!effectiveHovered) {
          setIsVisible(true);
        }
      }, 200); // Small constant delay between sides
    } else if (!effectiveHovered && bottomOnly) {
      // For bottomOnly, restart immediately on the same side
      setTimeout(() => {
        setIsVisible(true);
      }, 200);
    }
  };

  // Moving light effect when hovered
  useEffect(() => {
    if (effectiveHovered) {
      const interval = setInterval(() => {
        setLightPosition(prev => (prev + 1) % 100);
      }, 50); // Move every 50ms for smooth movement

      return () => clearInterval(interval);
    }
  }, [effectiveHovered]);

  // Generate shapes at beam position when hovered (disabled for bottomOnly)
  useEffect(() => {
    if (effectiveHovered && isVisible && !bottomOnly) {
      const interval = setInterval(() => {
        const newShape = {
          id: shapeIdRef.current++,
          x: Math.random() * 100, // Random position along the beam
          y: Math.random() * 100,
          color: rainbowColors[Math.floor(Math.random() * rainbowColors.length)],
          shape: shapesList[Math.floor(Math.random() * shapesList.length)],
          direction: ['up', 'down', 'left', 'right'][Math.floor(Math.random() * 4)]
        };

        setShapes(prev => [...prev.slice(-8), newShape]); // Keep only last 8 shapes

        // Remove shape after animation
        setTimeout(() => {
          setShapes(prev => prev.filter(shape => shape.id !== newShape.id));
        }, 2000);
      }, 300);

      return () => clearInterval(interval);
    }
  }, [effectiveHovered, isVisible, bottomOnly]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShapes([]);
    // Restart animation after a short delay
    setTimeout(() => {
      setTimeout(() => {
        setIsVisible(true);
      }, 300);
    }, 100);
  };


  const normalStyle = {
  }

  const hoveredStyle = {
  }

  const getBeamStyle = () => {
    const baseStyle = {
      animationDuration: `${duration}s`,
      filter: 'blur(0.5px)',
    };

    // Create airy gradient with shining center
    const createGradient = (direction: string) => {
      return `linear-gradient(${direction}, 
        transparent 0%, 
        transparent 20%, 
        ${colorFrom}40 30%, 
        ${colorTo}80 50%, 
        ${colorFrom}40 70%, 
        transparent 80%, 
        transparent 100%
      )`;
    };

    switch (currentSide) {
      case 0: // Top
        return {
          ...baseStyle,
          position: 'absolute' as const,
          top: 0,
          left: 0,
          width: `${size}px`,
          height: '3px',
          background: createGradient('90deg'),
          animation: 'beamTop 10s ease-in-out',
        };
      case 1: // Right
        return {
          ...baseStyle,
          position: 'absolute' as const,
          top: 0,
          right: 0,
          width: '3px',
          height: `${size}px`,
          background: createGradient('180deg'),
          animation: 'beamRight 4s ease-in-out',
        };
      case 2: // Bottom
        return {
          ...baseStyle,
          position: 'absolute' as const,
          bottom: 0,
          left: bottomOnly ? 0 : undefined,
          right: bottomOnly ? undefined : 0,
          width: bottomOnly ? '100%' : `${size}px`,
          height: '3px',
          background: createGradient(bottomOnly ? '90deg' : '270deg'),
          animation: bottomOnly ? 'beamBottomLeftToRight 3s ease-in-out infinite' : 'beamBottom 8s ease-in-out',
        };
      case 3: // Left
        return {
          ...baseStyle,
          position: 'absolute' as const,
          bottom: 0,
          left: 0,
          width: '3px',
          height: `${size}px`,
          background: createGradient('0deg'),
          animation: 'beamLeft 4s ease-in-out',
        };
      default:
        return baseStyle;
    }
  };

  const renderShape = (shape: { id: number, x: number, y: number, color: string, shape: string, direction: string }) => {
    const shapeSize = Math.random() * 2 + 3; // 3-4 pixels
    const shapeStyle = {
      position: 'absolute' as const,
      left: `${shape.x}%`,
      top: `${shape.y}%`,
      width: `${shapeSize}px`,
      height: `${shapeSize}px`,
      backgroundColor: shape.color,
      opacity: 0.8,
      animation: `flyOut${shape.direction} 2s ease-out forwards`,
      zIndex: 20,
      pointerEvents: 'none',
    };

    switch (shape.shape) {
      case 'circle':
        return <div key={shape.id} style={{ ...shapeStyle, borderRadius: '50%', pointerEvents: 'none' }} />;
      case 'square':
        return <div key={shape.id} style={{ ...shapeStyle, pointerEvents: 'none' }} />;
      case 'triangle':
        return (
          <div
            key={shape.id}
            style={{
              ...shapeStyle,
              width: 0,
              height: 0,
              backgroundColor: 'transparent',
              borderLeft: `${shapeSize / 2}px solid transparent`,
              borderRight: `${shapeSize / 2}px solid transparent`,
              borderBottom: `${shapeSize}px solid ${shape.color}`,
              pointerEvents: 'none',
            }}
          />
        );
      case 'diamond':
        return (
          <div
            key={shape.id}
            style={{
              ...shapeStyle,
              transform: 'rotate(45deg)',
              pointerEvents: 'none',
            }}
          />
        );
      default:
        return <div key={shape.id} style={{ ...shapeStyle, pointerEvents: 'none' }} />;
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative overflow-hidden bg-transparent',
        className)}
      style={effectiveHovered ? hoveredStyle : normalStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Single beam - one at a time (or triangle for bottomOnly) */}
      {isVisible && (!effectiveHovered || bottomOnly) && (
        <div
          ref={beamRef}
          className="absolute z-10"
          style={getBeamStyle()}
          onAnimationEnd={handleAnimationEnd}
        />
      )}
      
      {/* Moving triangle for bottomOnly mode - always visible when bottomOnly is true */}
      {bottomOnly && (
        <div
          className="absolute z-10"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: 0,
            height: 0,
            borderLeft: '4px solid transparent',
            borderRight: '4px solid transparent',
            borderBottom: `8px solid ${colorTo}`,
            animation: `triangleBottomLeftToRight 3s linear infinite`,
            animationDelay: `${animationDelay}s`,
            pointerEvents: 'none',
            opacity: 0.8,
          }}
        />
      )}

      {/* Flying geometric shapes on hover (disabled for bottomOnly) */}
      {effectiveHovered && !bottomOnly && shapes.map(renderShape)}

      {/* Moving light around border when hovered (disabled for bottomOnly) */}
      {effectiveHovered && !bottomOnly && (
        <div
          className="absolute z-10 "
          style={{
            position: 'absolute',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${colorTo} 0%, ${colorFrom} 50%, transparent 100%)`,
            animation: `moveLight 5s linear infinite`,
            animationDelay: `${animationDelay}s`,
            transform: `translate(${lightPosition * 4}px, 0)`, // This will be overridden by CSS animation
            pointerEvents: 'none',
          }}
        />
      )}
      <div className="relative z-0 hover:z-0">
        {children}
      </div>
      <style>{`
        @keyframes beamTop {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          5% {
            opacity: 0.8;
          }
          95% {
            opacity: 0.8;
          }
          100% {
            transform: translateX(100vw);
            opacity: 0;
          }
        }
        
        @keyframes beamRight {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          5% {
            opacity: 0.8;
          }
          95% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }
        
        @keyframes beamBottom {
          0% {
            transform: translateX(100%);
            opacity: 0;
          }
          5% {
            opacity: 0.8;
          }
          95% {
            opacity: 0.8;
          }
          100% {
            transform: translateX(-100vw);
            opacity: 0;
          }
        }
        
        @keyframes beamBottomLeftToRight {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          5% {
            opacity: 0.8;
          }
          95% {
            opacity: 0.8;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }
        
        @keyframes triangleBottomLeftToRight {
          0% {
            left: -20px;
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            left: calc(100% + 20px);
            opacity: 0;
          }
        }
        
        @keyframes beamLeft {
          0% {
            transform: translateY(100%);
            opacity: 0;
          }
          5% {
            opacity: 0.8;
          }
          95% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-100vh);
            opacity: 0;
          }
        }

        @keyframes flyOutup {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 0.8;
          }
          100% {
            transform: translate(0, -32px) scale(0.5);
            opacity: 0;
          }
        }

        @keyframes flyOutdown {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 0.8;
          }
          100% {
            transform: translate(0, 32px) scale(0.5);
            opacity: 0;
          }
        }

        @keyframes flyOutleft {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 0.8;
          }
          100% {
            transform: translate(-32px, 0) scale(0.5);
            opacity: 0;
          }
        }

        @keyframes flyOutright {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 0.8;
          }
          100% {
            transform: translate(32px, 0) scale(0.5);
            opacity: 0;
          }
        }

        @keyframes moveLight {
          0% {
            top: 0;
            left: 0;
            transform: translate(-4px, -4px);
          }
          25% {
            top: 0;
            left: 100%;
            transform: translate(-4px, -4px);
          }
          50% {
            top: 100%;
            left: 100%;
            transform: translate(-4px, -4px);
          }
          75% {
            top: 100%;
            left: 0;
            transform: translate(-4px, -4px);
          }
          100% {
            top: 0;
            left: 0;
            transform: translate(-4px, -4px);
          }
        }
      `}</style>
    </div>
  );
};

export default BorderBeam;
