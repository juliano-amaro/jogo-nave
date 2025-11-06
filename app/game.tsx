import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Dimensions, Animated, Text, Image } from "react-native";
import { Gyroscope } from "expo-sensors";
import { router } from "expo-router";

const { width, height } = Dimensions.get("window");
const SENSI = 15;
const SHIP_WIDTH = 70;
const SHIP_HEIGHT = 70;

const BULLET_WIDTH = 6;
const BULLET_HEIGHT = 20;
const BULLET_DURATION = 2000;

const METEOR_WIDTH = 50;
const METEOR_HEIGHT = 50;
const METEOR_DURATION = 5000;

export default function Game() {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [shipPosition, setShipPosition] = useState({
    x: width / 2 - SHIP_WIDTH / 2,
    y: height - SHIP_HEIGHT - 200,
  });
  const shipPositionRef = useRef(shipPosition);

  const [bullets, setBullets] = useState<
    {
      id: number;
      x: number;
      animatedY: Animated.Value;
      yRef: { current: number };
    }[]
  >([]);
  const [meteors, setMeteors] = useState<
    {
      id: number;
      x: number;
      animatedY: Animated.Value;
      yRef: { current: number };
      rotate: Animated.Value; // ✅ ADICIONADO campo de rotação
    }[]
  >([]);

  const bulletsRef = useRef(bullets);
  const meteorsRef = useRef(meteors);

  useEffect(() => {
    bulletsRef.current = bullets;
  }, [bullets]);
  useEffect(() => {
    meteorsRef.current = meteors;
  }, [meteors]);

  const [explosions, setExplosions] = useState<
    {
      id: number;
      x: number;
      y: number;
      scale: Animated.Value;
      opacity: Animated.Value;
    }[]
  >([]);

  // =========================
  // Tiro
  // =========================
  const shoot = () => {
    const id = Date.now();
    const currentX = shipPositionRef.current.x;
    const currentY = shipPositionRef.current.y;

    const animatedY = new Animated.Value(currentY);
    const yRef = { current: currentY };

    animatedY.addListener(({ value }) => (yRef.current = value));

    const newBullet = {
      id,
      x: currentX + SHIP_WIDTH / 2 - BULLET_WIDTH / 2,
      animatedY,
      yRef,
    };
    setBullets((prev) => [...prev, newBullet]);

    Animated.timing(animatedY, {
      toValue: -BULLET_HEIGHT,
      duration: BULLET_DURATION,
      useNativeDriver: true,
    }).start(() => {
      setBullets((prev) => prev.filter((b) => b.id !== id));
    });
  };

  // =========================
  // Spawn de meteoros
  // =========================
  const spawnMeteor = () => {
    const id = Date.now();
    const x = Math.random() * (width - METEOR_WIDTH);
    const y = -METEOR_HEIGHT;

    const animatedY = new Animated.Value(y);
    const yRef = { current: y };
    animatedY.addListener(({ value }) => (yRef.current = value));

    const rotate = new Animated.Value(0); // ✅ CRIADO controle de rotação

    const newMeteor = { id, x, animatedY, yRef, rotate };
    setMeteors((prev) => [...prev, newMeteor]);

    // ⚠️ ALTERADO: rotação e movimento separados (antes era Animated.parallel)
    Animated.timing(animatedY, {
      toValue: height,
      duration: METEOR_DURATION,
      useNativeDriver: true,
    }).start(() => {
      setMeteors((prev) => prev.filter((m) => m.id !== id));
    });

    Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
  };

  // =========================
  // Explosão visual
  // =========================
  const createExplosion = (x: number, y: number) => {
    const id = Date.now();
    const scale = new Animated.Value(1);
    const opacity = new Animated.Value(1);

    const newExplosion = { id, x, y, scale, opacity };
    setExplosions((prev) => [...prev, newExplosion]);

    Animated.parallel([
      Animated.timing(scale, {
        toValue: 2.5,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => setExplosions((prev) => prev.filter((e) => e.id !== id)));
  };

  // =========================
  // Checagem de colisão
  // =========================
  const checkCollisions = () => {
    const bulletsCurrent = bulletsRef.current;
    const meteorsCurrent = meteorsRef.current;

    let bulletsHit: number[] = [];
    let meteorsHit: number[] = [];

    bulletsCurrent.forEach((bullet) => {
      const bulletY = bullet.animatedY.__getValue();
      const bulletX = bullet.x;

      meteorsCurrent.forEach((meteor) => {
        const meteorY = meteor.animatedY.__getValue();
        const meteorX = meteor.x;

        const collided =
          bulletX < meteorX + METEOR_WIDTH &&
          bulletX + BULLET_WIDTH > meteorX &&
          bulletY < meteorY + METEOR_HEIGHT &&
          bulletY + BULLET_HEIGHT > meteorY;

        if (collided) {
          bulletsHit.push(bullet.id);
          meteorsHit.push(meteor.id);
          createExplosion(meteorX + METEOR_WIDTH / 2, meteorY + METEOR_HEIGHT / 2);
          console.log("💥 Colisão detectada!", meteor.id);
          setScore((prev) => prev + 1);
        }
      });
    });

    if (bulletsHit.length > 0 || meteorsHit.length > 0) {
      setBullets((prev) => prev.filter((b) => !bulletsHit.includes(b.id)));
      setMeteors((prev) => prev.filter((m) => !meteorsHit.includes(m.id)));
    }
  };

  useEffect(() => {
    if (score >= 30 && !gameOver) {
      router.replace("/win");
    }
  }, [score, gameOver]);

  // =========================
  // Movimento da nave
  // =========================
  useEffect(() => {
    Gyroscope.setUpdateInterval(16);
    const subscription = Gyroscope.addListener(setData);
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    let newX = shipPosition.x + data.y * SENSI;
    if (newX < 0) newX = 0;
    if (newX > width - SHIP_WIDTH) newX = width - SHIP_WIDTH;
    const newPos = { ...shipPosition, x: newX };
    setShipPosition(newPos);
    shipPositionRef.current = newPos;
  }, [data]);

  // =========================
  // Intervalos
  // =========================
  useEffect(() => {
    const shootInterval = setInterval(shoot, 500);
    const meteorInterval = setInterval(spawnMeteor, 1500);
    const collisionInterval = setInterval(checkCollisions, 50);

    return () => {
      clearInterval(shootInterval);
      clearInterval(meteorInterval);
      clearInterval(collisionInterval);
    };
  }, []);

  // =========================
  // Renderização
  // =========================
  return (
    <View style={styles.container}>
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>Score: {score}</Text>
      </View>

      <Image
        source={require("@/assets/images/NaveJogador.png")}
        style={[styles.ship, { left: shipPosition.x, top: shipPosition.y }]}
      />

      {bullets.map((bullet) => (
        <Animated.View
          key={bullet.id}
          style={[
            styles.bullet,
            { left: bullet.x, transform: [{ translateY: bullet.animatedY }] },
          ]}
        />
      ))}

      {meteors.map((meteor) => {
      
        const rotateInterpolate = meteor.rotate.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "360deg"],
        });

        return (
          <Animated.Image
            key={meteor.id}
            source={require("@/assets/images/meteoro.png")} // ✅ sprite do meteoro
            style={[
              styles.meteor,
              {
                left: meteor.x,
                transform: [
                  { translateY: meteor.animatedY },
                  { rotate: rotateInterpolate }, // ✅ rotação aplicada aqui
                ],
              },
            ]}
          />
        );
      })}

      {explosions.map((explosion) => (
        <Animated.View
          key={explosion.id}
          style={[
            styles.explosion,
            {
              left: explosion.x - 15,
              top: explosion.y - 15,
              transform: [{ scale: explosion.scale }],
              opacity: explosion.opacity,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  ship: {
    position: "absolute",
    width: SHIP_WIDTH,
    height: SHIP_HEIGHT,
    resizeMode: "contain",
  },
  bullet: {
    position: "absolute",
    width: BULLET_WIDTH,
    height: BULLET_HEIGHT,
    backgroundColor: "#0df",
    borderRadius: 3,
  },
  meteor: {
    position: "absolute",
    width: METEOR_WIDTH,
    height: METEOR_HEIGHT,
    resizeMode: "contain", // ✅ garante que a sprite não deforme
  },
  explosion: {
    position: "absolute",
    width: 30,
    height: 30,
    backgroundColor: "orange",
    borderRadius: 15,
  },
  scoreContainer: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 1000,
  },
  scoreText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});
