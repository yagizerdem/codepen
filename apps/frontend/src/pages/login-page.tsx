import LoginPanel from "@/components/auth-panels/login-panel";
import { Button } from "@base-ui/react";
import { useNavigate } from "react-router";
import { useMemo, useCallback, useState } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const particlesInit = async (engine: any) => {
  await loadSlim(engine);
};

export default function LoginPage() {
  const navigation = useNavigate();

  const particlesLoaded = useCallback(async (container: any) => {
    console.log("Particles container loaded", container);
  }, []);

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "#000",
        },
      },
      particles: {
        move: {
          enable: true,
          speed: 1.1,
        },
        number: {
          value: 42,
        },
        opacity: {
          value: {
            min: 0.35,
            max: 0.85,
          },
        },
        paint: {
          fill: {
            color: {
              value: ["#60a5fa", "#34d399", "#f59e0b", "#f472b6"],
            },
            enable: true,
          },
          stroke: {
            color: {
              value: "#ffffff",
            },
            width: 0,
          },
        },
        shape: {
          type: "square",
          close: true,
          options: {
            circle: {
              close: true,
            },
          },
        },
        size: {
          value: {
            min: 4,
            max: 10,
          },
        },
      },
    }),
    [],
  );

  return (
    <ParticlesProvider init={particlesInit}>
      <div className="w-screen h-screen bg-background z-0">
        <Particles options={options} particlesLoaded={particlesLoaded} />

        <div className="absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2  flex flex-col gap-y-2 z-10 ">
          <LoginPanel
            onClose={() => navigation("/")}
            onSignUp={() => navigation("/register")}
          />
          <Button
            onMouseUp={() => navigation("/")}
            className="cursor-pointer w-fit h-fit text-secondary-foreground outline-2 rounded-md px-2 py-1 
          hover:bg-secondary-foreground/20 
          hover:text-primary
          transition-all
          duration-200
          "
          >
            go back
          </Button>
        </div>
      </div>
    </ParticlesProvider>
  );
}
