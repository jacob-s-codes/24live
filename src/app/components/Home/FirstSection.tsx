import Logo from '../Login/Logo'
import PlayNow from './PlayNow'

const FirstSection = () => {
    return (
        <div className='flex flex-col items-center justify-center text-white px-4'>
            <div className='flex flex-col md:flex-row items-center justify-center gap-y-12 md:gap-x-12 my-10 md:my-20 w-full max-w-7xl'>
                <div className='flex flex-col items-start max-w-xl gap-y-8 md:gap-y-12 w-full'>
                    <h1 className='uppercase font-black text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-pinkaccent to-orangeaccent via-white'>
                        Play <span className='introtext'>24</span> Online
                    </h1>
                    <h2 className='uppercase font-bold text-2xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-pinkaccent to-orangeaccent'>
                        Play online against people from around the world!
                    </h2>
                    <PlayNow />
                </div>
                <div className='w-full md:w-2xl flex justify-center'>
                    <img src="/playonline.png" alt="Logo" className='w-full md:w-2xl h-auto rounded-lg' />
                </div>
            </div>
        </div>
    )
}

export default FirstSection