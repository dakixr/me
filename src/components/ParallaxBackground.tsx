"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface ParallaxLayer {
  id: string;
  speed: number;
  size: number;
  position: { x: string; y: string };
  opacity: number;
  blur: number;
}

export default function ParallaxBackground() {
  const { scrollY } = useScroll();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const layers: ParallaxLayer[] = [
    { id: "1", speed: 0.2, size: 400, position: { x: "10%", y: "20%" }, opacity: 0.6, blur: 80 },
    { id: "2", speed: 0.3, size: 300, position: { x: "80%", y: "30%" }, opacity: 0.5, blur: 100 },
    { id: "3", speed: 0.15, size: 500, position: { x: "60%", y: "70%" }, opacity: 0.4, blur: 120 },
    { id: "4", speed: 0.25, size: 350, position: { x: "20%", y: "80%" }, opacity: 0.5, blur: 90 },
    { id: "5", speed: 0.1, size: 450, position: { x: "50%", y: "50%" }, opacity: 0.3, blur: 150 },
  ];

  const y1 = useTransform(scrollY, [0, 1000], [0, -200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -300]);
  const y3 = useTransform(scrollY, [0, 1000], [0, -150]);
  const y4 = useTransform(scrollY, [0, 1000], [0, -250]);
  const y5 = useTransform(scrollY, [0, 1000], [0, -100]);
  const x1 = useTransform(scrollY, [0, 1000], [0, 20]);
  const x2 = useTransform(scrollY, [0, 1000], [0, 30]);
  const x3 = useTransform(scrollY, [0, 1000], [0, 15]);
  const x4 = useTransform(scrollY, [0, 1000], [0, 25]);
  const x5 = useTransform(scrollY, [0, 1000], [0, 10]);

  const gradientRotation = useTransform(scrollY, [0, 1000], [0, 45]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      <motion.div
        style={{
          rotate: gradientRotation,
          background: theme === "dark"
            ? "radial-gradient(ellipse at 30% 20%, rgba(99, 102, 241, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)"
            : "radial-gradient(ellipse at 30% 20%, rgba(99, 102, 241, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(139, 92, 246, 0.08) 0%, transparent 50%)",
        }}
        className="absolute inset-0 transition-colors duration-500"
      />

      {layers.map((layer, index) => {
        const yTransforms = [y1, y2, y3, y4, y5];
        const xTransforms = [x1, x2, x3, x4, x5];
        const y = yTransforms[index];
        const x = xTransforms[index];

        return (
          <motion.div
            key={layer.id}
            style={{
              y,
              x,
            }}
            className="absolute rounded-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: layer.opacity, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <div
              style={{
                width: `${layer.size}px`,
                height: `${layer.size}px`,
                left: layer.position.x,
                top: layer.position.y,
                filter: `blur(${layer.blur}px)`,
                background: theme === "dark"
                  ? `linear-gradient(135deg, rgba(99, 102, 241, 0.3) 0%, rgba(139, 92, 246, 0.3) 100%)`
                  : `linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)`,
              }}
              className="absolute rounded-full transition-colors duration-500"
            />
          </motion.div>
        );
      })}
    </div>
  );
}
