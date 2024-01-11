import React from 'react'
import './footer.css'

function Footer() {
  return (
   /*  <div className='bg-black w-100' style={{height:'300px'}}>
        <div className='row h-100  w-100 d-flex align-items-center'>
            <div className="col-lg-4  d-flex flex-column align-items-center">
                <h1 className='text-warning'>Project fair</h1>
            </div>
            <div className="col-lg-4 d-flex flex-column align-items-center">
                <h3 className='text-warning mb-3'>Pages</h3>
                <h5>facebook</h5>
                <h5>twitter</h5>
                <h5>instagram</h5>
            </div>
            <div className="col-lg-4 d-flex flex-column align-items-center">
                <h3 className='text-warning mb-3'>Pages</h3>
                <h5>facebook</h5>
                <h5>twitter</h5>
                <h5>instagram</h5>
            </div>
        </div>
    </div> */

   <div>
    <div style={{marginTop:'500px'}}></div>
      <footer className="footer mt-5"> 
      <div class="waves">
        <div class="wave" id="wave1"></div>
        <div class="wave" id="wave2"></div>
        <div class="wave" id="wave3"></div>
        <div class="wave" id="wave4"></div>
      </div>
      <ul class="social-icon">
        <li class="social-icon__item"><a class="social-icon__link" href="#">
            <ion-icon name="logo-facebook"></ion-icon>
          </a></li>
        <li class="social-icon__item"><a class="social-icon__link" href="#">
            <ion-icon name="logo-twitter"></ion-icon>
          </a></li>
        <li class="social-icon__item"><a class="social-icon__link" href="#">
            <ion-icon name="logo-linkedin"></ion-icon>
          </a></li>
        <li class="social-icon__item"><a class="social-icon__link" href="#">
            <ion-icon name="logo-instagram"></ion-icon>
          </a></li>
      </ul>
      <ul class="menu">
        <li class="menu__item"><a class="menu__link" href="#">Home</a></li>
        <li class="menu__item"><a class="menu__link" href="#">About</a></li>
        <li class="menu__item"><a class="menu__link" href="#">Services</a></li>
        <li class="menu__item"><a class="menu__link" href="#">Team</a></li>
        <li class="menu__item"><a class="menu__link" href="#">Contact</a></li>
  
      </ul>
      <p>&copy;2021 Nadine Coelho | All Rights Reserved</p>
    </footer>
    
   </div>
  
  )
}

export default Footer