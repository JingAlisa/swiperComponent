class Slider{
    constructor(id,cycle){
        this.container=document.getElementById(id);
        this.items=this.container.querySelectorAll("li");
        this.length=this.items.length;
        this.cycle=cycle;
        // 小圆点的逻辑
        const controller=document.querySelector(".slider-list__control");
        if(controller){
            const points=document.querySelectorAll(".slider-list__control span");
            console.log(points);
            controller.addEventListener("mouseover",(evt)=>{
                let indexPoint=Array.from(points).indexOf(evt.target);
                if(indexPoint>-1){
                    this.slideTo(indexPoint);
                    this.stop();
                }
            });
            controller.addEventListener("mouseout",(evt)=>{
                this.start();
            });

            this.container.addEventListener("slide",(evt)=>{
                const index=evt.detail.index;
                console.log(index);
                points.forEach((item)=>{
                    item.className="";
                })
                points[index].className="point-checked";
            })
        }
        // 左侧点击逻辑
        const leftCtr=document.querySelector(".swiper-left");
        leftCtr.addEventListener("click",(evt)=>{
            this.stop();
            this.slidePrevious();
            this.start();
            evt.preventDefault();
        });
        // 右侧点击逻辑
        const rightCtr=document.querySelector(".swiper-right");
        rightCtr.addEventListener("click",(evt)=>{
            this.stop();
            this.slideNext();
            this.start();
            evt.preventDefault();
        });
        
    }
    getSelectedItem(){
        const selected=this.container.querySelector(".slider_selected");
        return selected;
    }
    getSelectedItemIndex(){
        return Array.from(this.items).indexOf(this.getSelectedItem());
    }
    slideTo(idx){
        const selected=this.getSelectedItem();
        if(selected){
            selected.className="";
        }
        const item=this.items[idx];
        if(item){
            item.className="slider_selected";
        }

        const detail = {index: idx}
        const event = new CustomEvent('slide', {bubbles:true, detail})
        this.container.dispatchEvent(event)
    }
    slideNext(){
        const selectIndex=this.getSelectedItemIndex();
        this.slideTo((selectIndex+1)%this.length);
    }
    slidePrevious(){
        const selectIndex=this.getSelectedItemIndex();
        var previousIndex=selectIndex-1;
        if(previousIndex<0){
            previousIndex=this.length-1;
        }
        this.slideTo(previousIndex);
    }
    start(){
        this.stop();
        this.timer=setInterval(()=>{
            this.slideNext();
        },this.cycle);
    }
    stop(){
        clearInterval(this.timer);
    }
}

exports={
    Slider
}