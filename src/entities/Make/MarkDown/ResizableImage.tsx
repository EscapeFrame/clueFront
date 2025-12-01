import { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';

interface ResizableImageProps {
  src: string;
  alt: string;
  initialWidth?: number;
  onResize?: (width: number) => void;
}

const ImageContainer = styled.div`
  position: relative;
  display: inline-block;
  margin: 16px 0;
  user-select: none;
`;

const StyledImage = styled.img<{ isResizing: boolean }>`
  display: block;
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: ${props => props.isResizing ? 'ew-resize' : 'default'};
  transition: ${props => props.isResizing ? 'none' : 'box-shadow 0.2s'};
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ResizeHandle = styled.div<{ position: 'left' | 'right' }>`
  position: absolute;
  top: 0;
  ${props => props.position}: -8px;
  width: 16px;
  height: 100%;
  cursor: ew-resize;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;

  ${ImageContainer}:hover & {
    opacity: 1;
  }

  &::after {
    content: '';
    width: 4px;
    height: 40px;
    background: #4CAF50;
    border-radius: 2px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const WidthIndicator = styled.div<{ show: boolean }>`
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 12px;
  opacity: ${props => props.show ? 1 : 0};
  transition: opacity 0.2s;
  pointer-events: none;
  white-space: nowrap;
`;

export const ResizableImage = ({ src, alt, initialWidth = 500, onResize }: ResizableImageProps) => {
  const [width, setWidth] = useState(initialWidth);
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);
  const handleSideRef = useRef<'left' | 'right'>('right');

  const handleMouseDown = (e: React.MouseEvent, side: 'left' | 'right') => {
    e.preventDefault();
    setIsResizing(true);
    startXRef.current = e.clientX;
    startWidthRef.current = width;
    handleSideRef.current = side;
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;

      const deltaX = e.clientX - startXRef.current;
      const direction = handleSideRef.current === 'right' ? 1 : -1;
      const newWidth = Math.max(100, Math.min(1200, startWidthRef.current + deltaX * direction));
      
      setWidth(newWidth);
    };

    const handleMouseUp = () => {
      if (isResizing) {
        setIsResizing(false);
        onResize?.(width);
      }
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, width, onResize]);

  return (
    <ImageContainer ref={containerRef} style={{ width: `${width}px` }}>
      <StyledImage src={src} alt={alt} isResizing={isResizing} draggable={false} />
      <ResizeHandle position="left" onMouseDown={(e) => handleMouseDown(e, 'left')} />
      <ResizeHandle position="right" onMouseDown={(e) => handleMouseDown(e, 'right')} />
      <WidthIndicator show={isResizing}>{Math.round(width)}px</WidthIndicator>
    </ImageContainer>
  );
};
