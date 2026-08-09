'use client'

interface SubmitAnswerButtonProps {
    buttonText: string,
    onClick: () => void,
    color: string
    hoverColor: string
}

export default function SubmitAnswerButton({ buttonText, onClick, color, hoverColor }: SubmitAnswerButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onClick()
  }
  
  return (
    <button
            onClick={handleClick}
            className={`flex-1 text-white cursor-pointer font-semibold my-5 w-full px-6 py-4 rounded-lg transition-all active:scale-95 ${color} ${hoverColor}`}
            type="submit"              
        >
            {buttonText}
        </button>
  );
}