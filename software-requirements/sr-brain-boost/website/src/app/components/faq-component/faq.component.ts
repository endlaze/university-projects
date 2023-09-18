import { Component, OnInit, ElementRef } from '@angular/core';
import { FAQService } from '../../services/faq-service/faq.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.less']
})

export class FAQComponent implements OnInit {
  faq: any = []

  constructor(private faqService: FAQService, private elementRef: ElementRef) { }

  ngOnInit() {
    this.getFAQ()
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#f1f1ef';
  }

  getFAQ = () => {
    /*this.faqService.getFAQ().subscribe(res => {
      this.faq = this.formatFAQ(res)
    })*/
    this.faq = this.formatFAQ([
      {
        question: `¿Qué es una demencia?`,
        answer: `Según “Alzheimer's Association”, una demencia es el deterioro grave de la capacidad mental de una persona que interfiere en la vida cotidiana de la persona. No es una enfermedad específica, es un término general que describe un conjunto de condiciones que afectan la memoria y otras habilidades mentales.
    Más información en: https://www.alz.org/alzheimer-demencia/que-es-la-demencia`
      },
      { question: `¿A quiénes afecta la demencia?`,
        answer: `La demencia no afecta a un grupo específico de personas, la mayor cantidad de personas que padecen demencia son adultos mayores, pero la condición demencia puede presentarse en personas de todas las edades.` 
      },
      {
        question: `¿Cuántas personas en el mundo tienen demencia?`,
        answer: `Según “World Health Organization” de la “Organización Mundial de la Salud”, actualmente más de 50 millones de personas sufren de esta condición, de estas personas aproximadamente un 60% son de países de bajos recursos. Cada año se registran 10 millones de casos nuevos.
        Más información en: https://www.who.int/es/news-room/fact-sheets/detail/dementia`
      },
      {
        question: `¿Cuál causa de demencia es la más común?`,
        answer: `La enfermedad Alzheimer es la causa más común de los casos de demencia, acapara del 60% al &0% de todos los casos de demencia en el mundo.
        Más información en: https://www.who.int/es/news-room/fact-sheets/detail/dementia`
      },
      {
        question: `¿Qué es la enfermedad de Alzheimer?`,
        answer: `Según “Alzheimer’s Association”, es una enfermedad cerebral que afecta a la memoria de la persona, esto hace que la persona no se pueda desenvolver de forma normal en el hogar ni en la sociedad. La enfermedad tiende a empeorar con el tiempo, aunque los síntomas pueden variar dependiendo de la persona. Comúnmente se dice que la pérdida de memoria es normal en las personas mayores, pero esto no es cierto. Cualquier preocupación acerca de la pérdida de memoria se debe consultar con un médico.`
      },
      {
        question: `¿En qué consiste la afasia?`,
        answer: `Según “American Speech-Language-Hearing Association”, la afasia en un trastorno cerebral que afecta al lenguaje de la persona, por lo que puede causar problemas de expresión, comprensión, lectura y/o escritura.
        Ver más en: https://www.asha.org/public/speech/disorders/La-Afasia/`
      },
      {
        question: `¿En qué consiste la apraxia?`,
        answer: `Es el cese o la dificultad de coordinar una serie de movimientos para realizar una actividad, los pacientes no puede ordenar los movimientos y/o encontrar una secuencia para realizar una acción. Existen diferentes tipos de apraxia, como ideacional, del habla, constructiva, entre otras.
        Ver más: https://psicologiaymente.com/clinica/apraxia`
      },
      {
        question: `¿En qué consiste la agnosia?`,
        answer: `La agnosia es la dificultad o incapacidad de procesar ciertos estímulos sensoriales. Generalmente las agnosias aparecen luego de lesiones cerebrales. Ver más: https://psicologiaymente.com/clinica/tipos-de-agnosia`
      }
    ])
  }

  formatFAQ = (faq) => {
    return faq.map((question, index) => {
      question['selected'] = false
      question['id'] = 'question-' + index
      return question
    })
  }

  toggleQuestion = (questionId) => {
    this.faq.forEach(question => {
      question.selected = (question.id === questionId) ? (!question.selected) : false
    });
  }
}
