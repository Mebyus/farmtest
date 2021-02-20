JAVAC=javac
JAR=jar
OUTDIR=./dist/WEB-INF
BACKSRC=./src/back
SERVLET_API=/home/mebyus/Downloads/apache-tomcat-10.0.2/lib/servlet-api.jar

all: classes web.xml webpack

# war:
# 	$(JAR) -cf ./dist/farmtest.war *

webpack:
	npm run build

web.xml:
	cp $(BACKSRC)/web.xml $(OUTDIR)

classes: $(BACKSRC)/Details.java $(BACKSRC)/Receipt.java $(BACKSRC)/DatabaseConnection.java
	$(JAVAC) -cp $(SERVLET_API) -d $(OUTDIR)/classes $^

clean:
	rm --recursive dist