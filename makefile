IN = justificacion.tex
OUT = justificacion.pdf

all:
	pdflatex $(IN) -o $(OUT)
