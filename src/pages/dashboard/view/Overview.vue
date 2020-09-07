<template>
  <div class="overview block">
    <div class="block-header">
      <div class="block-header__title">总览</div>
    </div>
    <div class="block-body">
      <div class="block-body__inner icon-flex">
        <div class="flex-item">
          <img class="icon" src="~@/pages/dashboard/images/yunxing@2x.png" />
          <div class="numerical">1000</div>
          <div class="label">运行</div>
        </div>

        <div class="flex-item">
          <img class="icon" src="~@/pages/dashboard/images/tingji@2x.png" />
          <div class="numerical">20000</div>
          <div class="label">停机</div>
        </div>

        <div class="flex-item">
          <img class="icon" src="~@/pages/dashboard/images/lixian@2x.png" />
          <div class="numerical">100</div>
          <div class="label">离线</div>
        </div>

        <div class="flex-item">
          <img class="icon" src="~@/pages/dashboard/images/guzhang@2x.png" />
          <div class="numerical">100</div>
          <div class="label">故障</div>
        </div>

        <div class="flex-item">
          <img
            class="icon"
            src="~@/pages/dashboard/images/zongchanliang@2x.png"
          />
          <div class="numerical">120000</div>
          <div class="label">总产量</div>
        </div>
        <div class="flex-item">
          <img
            class="icon"
            src="~@/pages/dashboard/images/zonglianglv@2x.png"
          />
          <div class="numerical">90%</div>
          <div class="label">总良率</div>
        </div>
        <div class="flex-item">
          <img
            class="icon"
            src="~@/pages/dashboard/images/pingjunjiadonglv@2x.png"
          />
          <div class="numerical">80%</div>
          <div class="label">平均稼动率</div>
        </div>
      </div>
    </div>
    <div class="block-footer"></div>
  </div>
</template>
