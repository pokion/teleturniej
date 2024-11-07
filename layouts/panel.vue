<script setup lang="ts">
  let sidebarItems = [
          {name: 'Tournament', ico: 'icon-park-outline:trophy', href: '/adminPanel'},
          {name: 'History', ico: 'icon-park-outline:history', href: '/adminPanel/history'},
          {name: 'Poll', ico: 'icon-park-outline:list-success', href: '/adminPanel/poll'},
          {name: 'Game', ico: 'icon-park-outline:game-handle', href: '/adminPanel/game'},
          {name: 'Statistics', ico: 'icon-park-outline:chart-histogram-two', href: '/adminPanel/stats'}
      ]
</script>

<template>
  <div>
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>

              <SidebarMenu >
                <SidebarMenuItem v-for="item in sidebarItems" :key="item.name">
                  <SidebarMenuButton asChild>
                    <a :href="item.href">
                      <Icon :name="item.ico" mode="svg" />
                      <span>{{item.name}}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>

            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <main class="w-screen">
        <SidebarTrigger />
        <slot />
      </main>
    </SidebarProvider>
  </div>
</template>