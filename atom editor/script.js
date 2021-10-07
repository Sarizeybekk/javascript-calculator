class Hesap_makinesi {//bilgileri depolamak için  hesap_makinesi adında sınıf oluşturdum
	  constructor(oncekiİslemTextElement, sonrakiİslemTextElement) {
	    this.oncekiİslemTextElement = oncekiİslemTextElement
	    this.sonrakiİslemTextElement = sonrakiİslemTextElement
	    this.clear()
	  }


	  clear() {//ac
	    this.sonrakiİslem = ''
	    this.oncekiİslem = ''
	    this.islem = undefined
	  }


	  delete() {
	    this.sonrakiİslem = this.sonrakiİslem.toString().slice(0, -1)
	  }


	  sayiEkle(number) {//ekleme fonk
	    if (number === '.' && this.sonrakiİslem.includes('.')) return
	    this.sonrakiİslem= this.sonrakiİslem.toString() + number.toString()
	  }


	  chooseOperation(islem) {// işlem seçme fonksiyonu
	    if (this.sonrakiİslem === '') return
	    if (this.oncekiİslem !== '') {
	      this.hesapla()
	    }
	    this.islem = islem
	    this.oncekiİslem = this.sonrakiİslem
	    this.sonrakiİslem = ''
	  }


	  hesapla() {
	    let sonuc
	    const onceki = parseFloat(this.oncekiİslem)
	    const sonraki = parseFloat(this.sonrakiİslem)
	    if (isNaN(onceki) || isNaN(sonraki)) return
	    switch (this.islem) {
	      case '+':
	        sonuc = onceki + sonraki
	        break
	      case '-':
	        sonuc = onceki - sonraki
	        break
	      case '*':
	        sonuc = onceki * sonraki
	        break
	      case '÷':
	        sonuc = onceki / sonraki
	        break
	      default:
	        return
	    }
	    this.sonrakiİslem = sonuc
	    this.islem = undefined
	    this.oncekiİslem = ''
	  }


	  getDisplayNumber(number) {
	    const stringNumber = number.toString()
	    const integerDigits = parseFloat(stringNumber.split('.')[0])
	    const decimalDigits = stringNumber.split('.')[1]
	    let integerDisplay
	    if (isNaN(integerDigits)) {
	      integerDisplay = ''
	    } else {
	      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
	    }
	    if (decimalDigits != null) {
	      return `${integerDisplay}.${decimalDigits}`
	    } else {
	      return integerDisplay
	    }
	  }


	  guncelle() {//güncelleme fonk.
	    this.sonrakiİslemTextElement.innerText =
	      this.getDisplayNumber(this.sonrakiİslem)
	    if (this.islem != null) {
	      this.oncekiİslemTextElement.innerText =
	        `${this.getDisplayNumber(this.oncekiİslem)} ${this.islem}`
	    } else {
	      this.oncekiİslemTextElement.innerText = ''
	    }
	  }
	}




	const numberButtons = document.querySelectorAll('[data-number]')
	const islemButtons = document.querySelectorAll('[data-islem]')
	const equalsButton = document.querySelector('[data-equals]')
	const deleteButton = document.querySelector('[data-delete]')
	const allClearButton = document.querySelector('[data-all-clear]')
	const oncekiİslemTextElement = document.querySelector('[data-onceki-islem]')
	const sonrakiİslemTextElement = document.querySelector('[data-sonraki-islem]')


	const hesap_makinesi = new Hesap_makinesi(oncekiİslemTextElement, sonrakiİslemTextElement)


	numberButtons.forEach(button => {
	  button.addEventListener('click', () => {
	 hesap_makinesi.sayiEkle(button.innerText)
	    hesap_makinesi.guncelle()
	  })
	})


	islemButtons.forEach(button => {
	  button.addEventListener('click', () => {
	    hesap_makinesi.chooseOperation(button.innerText)
	    hesap_makinesi.guncelle()
	  })
	})


	equalsButton.addEventListener('click', button => {
	  hesap_makinesi.hesapla()
	  hesap_makinesi.guncelle()
	})


	allClearButton.addEventListener('click', button => {
	  hesap_makinesi.clear()
	  hesap_makinesi.guncelle()
	})


	deleteButton.addEventListener('click', button => {
	  hesap_makinesi.delete()
	  hesap_makinesi.guncelle()
	})
