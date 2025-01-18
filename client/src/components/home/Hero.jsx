import { useEffect, useState } from "react";
import { Connect } from "./Connect";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function Hero() {
  const [step, setStep] = useState(0);
  const [parent] = useAutoAnimate({ duration: 300 });
  useEffect(() => setStep(1), []);
  return (
    <div className="relative z-10 min-h-[500px] flex-shrink-0 md:p-5 sm:p-8 w-full ">
      <div className="flex h-full  w-full flex-col bg-background-secondary  justify-center gap-8 rounded-lg md:p-8 py-8 backdrop-blur-sm border border-border">
        <StepProgression step={step} />
        <div
          ref={parent}
          className="flex h-full  w-full flex-col justify-center gap-2 rounded-lg p-8  text-center backdrop-blur-sm  "
        >
          {step === 1 && <GetStarted setStep={setStep} />}
          {step === 2 && <Connect />}
        </div>
      </div>
    </div>
  );
}

function StepProgression({ step }) {
  const steps = 2;
  return (
    <div className="flex justify-center gap-2 relative">
      {Array.from({ length: steps }).map((_, i) => (
        <Step key={i} curr={step} step={i + 1} />
      ))}
    </div>
  );
}

function Step({ curr, step }) {
  return (
    <div className="flex justify-center gap-2">
      <div className="w-10 h-3 rounded-lg bg-border relative ">
        <div
          className={`absolute h-3 rounded-full bg-secondary transition-all duration-500 ${
            curr >= step ? "w-10 " : "w-0"
          } `}
        ></div>
      </div>
    </div>
  );
}

function GetStarted({ setStep }) {
  return (
    <>
      <h1 className="text-2xl font-medium text-text-primary sm:text-3xl ">
        <ShinyText
          text="Just some shiny text!"
          disabled={false}
          speed={3}
          className="custom-class"
        >
          <span className="font-extrabold ">Welcome to Talky Walky </span>
        </ShinyText>
      </h1>
      <p className="text-lg font-medium text-text-secondary z">
        Experience real-time messaging powered by the future of networking.{" "}
      </p>
      <button
        onClick={() => setStep((e) => e + 1)}
        className=" p-2 border border-border rounded-lg bg-background-tertiary hover:bg-background-disabled w-full md:w-1/3 mx-auto"
      >
        Get Started
      </button>
    </>
  );
}
export const ShinyText = ({
  children,
  disabled = false,
  speed = 5,
  className = "",
}) => {
  const animationDuration = `${speed}s`;

  return (
    <div
      className={`text-[#b5b5b5a4] bg-clip-text inline-block ${
        disabled ? "" : "animate-shine"
      } ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.9) 50%, rgba(255, 255, 255, 0) 60%)",
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        animationDuration: animationDuration,
      }}
    >
      {children}
    </div>
  );
};
