#---------------------------------------------------------------------------
# Copyright 2013
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#---------------------------------------------------------------------------


cmake_minimum_required(VERSION 2.8.6)
find_package(Java)
include(UseJava)
project(WEB_ATF Java)

include(CTest)
#-----------------------------------------------------------------------------#
##### SECTION TO CONFIGURE OSEHRA AUTOMATED TESTING HARNESS #####
#-----------------------------------------------------------------------------#
  add_subdirectory(testing)

#-----------------------------------------------------------------------------#
##### SECTION TO GENERATE VISUAL CROSS REFERENCE DOCUMENTATION #####
#-----------------------------------------------------------------------------#
#OPTION(ROUTINE_CALL_GRAPH "Build Rouine Call Graph." OFF)
#if(ROUTINE_CALL_GRAPH)
#  add_subdirectory(Utilities/Dox)
#endif()
