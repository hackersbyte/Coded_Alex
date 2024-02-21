import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsFacebook,  BsInstagram, BsTwitter, BsGithub, BsLinkedin, BsYoutube, BsTiktok, BsThreads } from "react-icons/bs";

export default function FooterCom() {
  return (
    <Footer container className='border border-t-8 border-teal-500'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
                <div className='mt-5'>
                    <Link to="/" className='self-center whitespace-nowrap text-lg
                        sm:text-xl font-semibold dark:text-white' >
                            <span className='px-3 py-1 bg-gradient-to-r from-blue-500 
                              via-indigo-600 to-pink-600 rounded-lg text-white' >
                                Coded Alex
                            </span>
                        Blog
                    </Link>
                </div>
                <div className='grid grid-cols-2 gap-3 mt-4 sm:grid-cols-3 sm:gap-6'>
                    <div>
                    <Footer.Title title='About' />
                        <Footer.LinkGroup col>
                            <Footer.Link
                            href='https://www.codedalex.com/projects'
                            target='_blank'
                            rel='noopener noreferrer'
                            >
                            100 JS Projects
                            </Footer.Link>
                            <Footer.Link
                            href='/about'
                            target='_blank'
                            rel='noopener noreferrer'
                            >
                            Coded Alex Blog
                            </Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                    <div>
                        <Footer.Title title='Follow us' />
                        <Footer.LinkGroup col>
                            <Footer.Link
                            href='https://www.github.com/hackersbyte'
                            target='_blank'
                            rel='noopener noreferrer'
                            >
                            Github
                            </Footer.Link>
                            <Footer.Link href='#'>Discord</Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                    <div>
                        <Footer.Title title='Legal' />
                        <Footer.LinkGroup col>
                            <Footer.Link href='#'>Privacy Policy</Footer.Link>
                            <Footer.Link href='#'>Terms &amp; Conditions</Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                    </div>
                </div>
                <Footer.Divider />
                <div className='w-full sm:flex sm:items-center sm:justify-between'>
                <Footer.Copyright
                    href='#'
                    by="Coded Alex blog"
                    year={new Date().getFullYear()}
                />
                <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
                    <Footer.Icon href='#' icon={BsFacebook}/>
                    <Footer.Icon  
                        onClick={() => window.open("https://www.instagram.com/coded_alex_official", "_blank")} icon={BsInstagram}
                    />
                    <Footer.Icon 
                        onClick={() => window.open("https://twitter.com/coded_alex_offi", "_blank")} icon={BsTwitter}
                    />
                    <Footer.Icon href='https://github.com/hackersbyte'  icon={BsGithub}/>

                    <Footer.Icon 
                        onClick={() => window.open("https://www.linkedin.com/in/alex-mutonga/", "_blank")} icon={BsLinkedin}
                    />
                    <Footer.Icon
                        onClick={() => window.open("https://www.youtube.com/channel/UCa3tafrUF0Y2_ZzQw9P5N8A", "_blank")} icon={BsYoutube}/>
                    <Footer.Icon 
                        onClick={() => window.open("https://www.threads.net/@coded_alex_official", "_blank")} icon={BsThreads}
                    />
                    <Footer.Icon 
                        onClick={() => window.open("https://www.tiktok.com/@coded_alex_official", "_blank")} icon={BsTiktok}
                    />

                </div>
            </div>
        </div>
    </Footer>
  )
}
